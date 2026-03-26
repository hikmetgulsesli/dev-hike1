import { NextRequest, NextResponse } from 'next/server';
import { successResponse, validationErrorResponse, rateLimitResponse, errorResponse } from '@/lib/api-response';
import type { ContactFormData } from '@/lib/types';

// Rate limiting configuration (configurable via env vars)
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW || '3600000', 10); // 1 hour default
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);

// Simple in-memory rate limiting
// Note: In production with multiple instances, use Redis for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { limited: true, retryAfter };
  }
  
  record.count++;
  return { limited: false, retryAfter: 0 };
}

function validateNameField(value: string, fieldName: string): string | undefined {
  if (!value.trim()) return `${fieldName} zorunludur`;
  if (value.trim().length < 2 || value.trim().length > 50) return `${fieldName} 2-50 karakter arasında olmalıdır`;
  if (!/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/.test(value.trim())) return `${fieldName} sadece harflerden oluşmalıdır`;
  return undefined;
}

function validateContactForm(data: unknown): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    errors.form = 'Geçersiz form verisi';
    return errors;
  }
  
  const d = data as Record<string, unknown>;
  
  const rawFirstName = d.firstName;
  const rawLastName = d.lastName;
  const rawEmail = d.email;
  const rawSubject = d.subject;
  const rawMessage = d.message;

  const firstName = typeof rawFirstName === 'string' ? rawFirstName : '';
  const lastName = typeof rawLastName === 'string' ? rawLastName : '';
  const email = typeof rawEmail === 'string' ? rawEmail : '';
  const subject = typeof rawSubject === 'string' ? rawSubject : '';
  const message = typeof rawMessage === 'string' ? rawMessage : '';

  const firstNameError = validateNameField(firstName, 'Ad');
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateNameField(lastName, 'Soyad');
  if (lastNameError) errors.lastName = lastNameError;

  if (!email.trim()) {
    errors.email = 'E-posta zorunludur';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Geçerli bir e-posta adresi giriniz';
  }

  if (!subject.trim()) {
    errors.subject = 'Konu zorunludur';
  } else if (subject.trim().length < 5 || subject.trim().length > 200) {
    errors.subject = 'Konu 5-200 karakter arasında olmalıdır';
  }

  if (!message.trim()) {
    errors.message = 'Mesaj zorunludur';
  } else if (message.trim().length < 20 || message.trim().length > 2000) {
    errors.message = 'Mesaj 20-2000 karakter arasında olmalıdır';
  }

  return errors;
}

function getClientIp(request: NextRequest): string {
  const requestIp = (request as unknown as { ip?: string }).ip;
  const realIp = request.headers.get('x-real-ip');
  const forwardedFor = request.headers.get('x-forwarded-for');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const clientIp = request.headers.get('x-client-ip');
  
  const forwardedIp = forwardedFor ? forwardedFor.split(',')[0].trim() : undefined;
  
  const ip = requestIp || realIp || forwardedIp || cfConnectingIp || clientIp;
  
  if (ip && ip.length > 0) {
    return ip;
  }
  
  // Fallback: derive a key from stable headers to avoid collapsing all clients
  const userAgent = request.headers.get('user-agent') || 'unknown-agent';
  const acceptLanguage = request.headers.get('accept-language') || 'unknown-lang';
  return `${userAgent}:${acceptLanguage}`;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const { limited, retryAfter } = isRateLimited(ip);
    if (limited) {
      return NextResponse.json(
        rateLimitResponse(retryAfter),
        { 
          status: 429,
          headers: { 'Retry-After': String(retryAfter) }
        }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_JSON',
            message: 'Geçersiz JSON gövdesi gönderildi.'
          }
        },
        { status: 400 }
      );
    }

    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PAYLOAD',
            message: 'İstek gövdesi geçerli bir nesne olmalıdır.'
          }
        },
        { status: 400 }
      );
    }

    const errors = validateContactForm(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        validationErrorResponse(errors),
        { status: 400 }
      );
    }

    const d = body as Record<string, string>;
    const id = `contact-${crypto.randomUUID()}`;

    // In production, use a proper logging solution (Winston, Pino, etc.)
    const logEntry = {
      id,
      subject: d.subject.trim(),
      messageLength: d.message.trim().length,
      submittedAt: new Date().toISOString(),
    };
    
    // Use console.log in development; in production, use structured logging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Contact form submission:', logEntry);
    }

    return NextResponse.json(
      successResponse({ id }),
      { status: 201 }
    );
  } catch (error) {
    // In production, use a proper logging solution
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
