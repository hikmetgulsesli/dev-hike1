import { NextRequest, NextResponse } from 'next/server';
import { skills } from '@/lib/data';
import { successResponse, errorResponse } from '@/lib/api-response';

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
    console.error('Failed to fetch skills:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
