import { NextRequest, NextResponse } from 'next/server';
import { skills } from '@/lib/data';
import { successResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    let filteredSkills = skills;

    if (category) {
      filteredSkills = skills.filter(skill => skill.category === category);
    }

    return NextResponse.json(
      successResponse(filteredSkills),
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
