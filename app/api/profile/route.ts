import { NextRequest, NextResponse } from 'next/server';
import { author } from '@/lib/data';
import { successResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      successResponse(author),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/profile:', error);
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
