import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';
import { successResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    const featuredProjects = projects
      .filter(p => p.status === 'published' && p.featured)
      .sort((a, b) => {
        const orderA = a.sortOrder || 999;
        const orderB = b.sortOrder || 999;
        return orderA - orderB;
      })
      .slice(0, limit);

    return NextResponse.json(
      successResponse(featuredProjects),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/projects/featured:', error);
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
