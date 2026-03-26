import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '1', 10);

    const featuredPosts = blogPosts
      .filter(p => p.status === 'published' && p.featured)
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
      })
      .slice(0, limit);

    return NextResponse.json(
      successResponse(limit === 1 ? (featuredPosts[0] || null) : featuredPosts),
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch featured posts:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
