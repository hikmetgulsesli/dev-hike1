import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data';
import { paginatedResponse, calculatePagination, validationErrorResponse } from '@/lib/api-response';
import type { BlogPost } from '@/lib/types';

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

    let filteredPosts = blogPosts.filter((p: BlogPost) => p.status === 'published');

    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter((p: BlogPost) => p.category === category);
    }

    if (featured === 'true') {
      filteredPosts = filteredPosts.filter((p: BlogPost) => p.featured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (p: BlogPost) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.excerpt.toLowerCase().includes(searchLower) ||
          p.tags.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    // Sort: pinned first, then by date
    filteredPosts.sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return b.pinned ? 1 : -1;
      }
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
  } catch {
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
