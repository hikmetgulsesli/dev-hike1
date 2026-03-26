import { NextRequest, NextResponse } from 'next/server';
import { author } from '@/lib/data';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      successResponse(author),
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
