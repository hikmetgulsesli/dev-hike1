import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data';
import { paginatedResponse, calculatePagination, validationErrorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
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

    let filteredPosts = blogPosts.filter(p => p.status === 'published');

    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(p => p.category === category);
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (featured === 'true') {
      filteredPosts = filteredPosts.filter(p => p.featured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    const total = filteredPosts.length;
    const pagination = calculatePagination(page, limit, total);
    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    return NextResponse.json(
      paginatedResponse(paginatedPosts, pagination),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
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
