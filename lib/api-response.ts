import { ApiResponse, ApiError, Pagination } from './types';

export function successResponse<T>(data: T, timestamp: string = new Date().toISOString()): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp,
  };
}

export function errorResponse(
  code: string,
  message: string,
  details?: Record<string, string>,
  timestamp: string = new Date().toISOString()
): ApiResponse<never> {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp,
  };
}

export function paginatedResponse<T>(
  data: T[],
  pagination: Pagination,
  timestamp: string = new Date().toISOString()
): ApiResponse<{ data: T[]; pagination: Pagination }> {
  return {
    success: true,
    data: {
      data,
      pagination,
    },
    timestamp,
  };
}

export function notFoundResponse(resource: string, identifier?: string): ApiResponse<never> {
  const message = identifier
    ? `${resource} with id/slug "${identifier}" not found`
    : `${resource} not found`;
  return errorResponse('NOT_FOUND', message, undefined, new Date().toISOString());
}

export function validationErrorResponse(errors: Record<string, string>): ApiResponse<never> {
  return errorResponse('VALIDATION_ERROR', 'Invalid input data', errors, new Date().toISOString());
}

export function rateLimitResponse(retryAfter: number): ApiResponse<never> {
  return errorResponse(
    'RATE_LIMITED',
    `Too many requests. Please try again after ${retryAfter} seconds.`,
    { retryAfter: String(retryAfter) },
    new Date().toISOString()
  );
}

export function calculatePagination(
  page: number,
  limit: number,
  total: number
): Pagination {
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
