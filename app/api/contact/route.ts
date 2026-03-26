import { NextRequest, NextResponse } from 'next/server';
import { successResponse, validationErrorResponse, rateLimitResponse } from '@/lib/api-response';
import type { ContactFormData } from '@/lib/types';

// Simple in-memory rate limiting (5 requests per hour per IP)
// In production, use Redis or similar
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  const limit = 5;
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + hourMs });
    return { limited: false, retryAfter: 0 };
  }
  
  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { limited: true, retryAfter };
  }
  
  record.count++;
  return { limited: false, retryAfter: 0 };
}

function validateContactForm(data: Partial<ContactFormData>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = 'First name must be at most 50 characters';
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = 'Last name must be at most 50 characters';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 200) {
    errors.subject = 'Subject must be at most 200 characters';
  }

  if (!data.message || data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be at most 2000 characters';
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || request.headers.get('x-real-ip') 
      || 'unknown';

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

    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    const errors = validateContactForm({ firstName, lastName, email, subject, message });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        validationErrorResponse(errors),
        { status: 400 }
      );
    }

    const id = `contact-${crypto.randomUUID()}`;

    console.log('Contact form submission:', {
      id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      messageLength: message.trim().length,
      ip,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      successResponse({ id }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
