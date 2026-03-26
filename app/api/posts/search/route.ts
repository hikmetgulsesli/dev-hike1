import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data';
import { successResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        successResponse([]),
        { status: 200 }
      );
    }

    const searchLower = q.toLowerCase().trim();

    const results = blogPosts
      .filter(p => p.status === 'published')
      .filter(
        post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(t => t.toLowerCase().includes(searchLower))
      )
      .slice(0, limit)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
      }));

    return NextResponse.json(
      successResponse(results),
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
