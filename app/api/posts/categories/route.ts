import { NextRequest, NextResponse } from 'next/server';
import { blogPosts, categories } from '@/lib/data';
import { successResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const categoryCounts: Record<string, number> = {};
    
    blogPosts
      .filter(p => p.status === 'published')
      .forEach(post => {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
      });

    const result = categories.map(cat => ({
      category: cat.category,
      label: cat.label,
      count: categoryCounts[cat.category] || 0,
    }));

    return NextResponse.json(
      successResponse(result),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/posts/categories:', error);
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
