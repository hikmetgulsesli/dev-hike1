import { ApiResponse, PaginatedResponse, Pagination } from './types';

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(code: string, message: string, details?: Record<string, string>): ApiResponse<never> {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

export function paginatedResponse<T>(data: T[], pagination: Pagination): PaginatedResponse<T> {
  return {
    data,
    pagination,
  };
}

export function calculatePagination(page: number, limit: number, total: number): Pagination {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export function validationErrorResponse(details: Record<string, string>): ApiResponse<never> {
  return errorResponse('VALIDATION_ERROR', 'Validation failed', details);
}
