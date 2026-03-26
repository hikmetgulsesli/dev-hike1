import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';
import { paginatedResponse, calculatePagination, validationErrorResponse, errorResponse } from '@/lib/api-response';
import type { Project } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        validationErrorResponse({ page: 'Page must be a positive integer' }),
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        validationErrorResponse({ limit: 'Limit must be between 1 and 100' }),
        { status: 400 }
      );
    }

    let filteredProjects = projects.filter((p: Project) => p.status === 'published');

    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter((p: Project) => p.category === category);
    }

    if (featured === 'true') {
      filteredProjects = filteredProjects.filter((p: Project) => p.featured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(
        (p: Project) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.techStack.some((t) => t.name.toLowerCase().includes(searchLower))
      );
    }

    filteredProjects.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    const total = filteredProjects.length;
    const pagination = calculatePagination(page, limit, total);
    const startIndex = (page - 1) * limit;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + limit);

    return NextResponse.json(
      paginatedResponse(paginatedProjects, pagination),
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
