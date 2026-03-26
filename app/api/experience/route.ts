import { NextRequest, NextResponse } from 'next/server';
import { experiences } from '@/lib/data';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const sortedExperiences = [...experiences].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(
      successResponse(sortedExperiences),
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
