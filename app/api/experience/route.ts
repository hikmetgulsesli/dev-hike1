import { NextRequest, NextResponse } from 'next/server';
import { experiences } from '@/lib/data';
import { successResponse } from '@/lib/api-response';

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
