import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';
import { successResponse, notFoundResponse } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = projects.find(p => p.slug === slug && p.status === 'published');

    if (!project) {
      return NextResponse.json(
        notFoundResponse('Project', slug),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse(project),
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
