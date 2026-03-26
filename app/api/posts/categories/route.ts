import { NextRequest, NextResponse } from 'next/server';
import { blogPosts, categories } from '@/lib/data';
import { successResponse, errorResponse } from '@/lib/api-response';

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
    console.error('Failed to fetch post categories:', error);
    return NextResponse.json(
      errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}
