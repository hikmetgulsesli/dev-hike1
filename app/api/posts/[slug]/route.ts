import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data';
import { successResponse, notFoundResponse } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const post = blogPosts.find(p => p.slug === slug && p.status === 'published');

    if (!post) {
      return NextResponse.json(
        notFoundResponse('Blog post', slug),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse(post),
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in GET /api/posts/${slug}:`, error);
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
