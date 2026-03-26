import { describe, it, expect } from 'vitest';
import { 
  successResponse, 
  errorResponse, 
  paginatedResponse,
  notFoundResponse,
  validationErrorResponse,
  rateLimitResponse,
  calculatePagination
} from './api-response';

describe('API Response Helpers', () => {
  describe('successResponse', () => {
    it('returns correct success response structure', () => {
      const data = { id: '1', name: 'Test' };
      const result = successResponse(data);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
      expect(result.timestamp).toBeDefined();
    });

    it('uses custom timestamp when provided', () => {
      const customTime = '2024-01-01T00:00:00Z';
      const result = successResponse({ id: '1' }, customTime);
      
      expect(result.timestamp).toBe(customTime);
    });
  });

  describe('errorResponse', () => {
    it('returns correct error response structure', () => {
      const result = errorResponse('TEST_ERROR', 'Test error message');
      
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('TEST_ERROR');
      expect(result.error?.message).toBe('Test error message');
      expect(result.timestamp).toBeDefined();
    });

    it('includes details when provided', () => {
      const details = { field: 'email', issue: 'invalid format' };
      const result = errorResponse('VALIDATION_ERROR', 'Validation failed', details);
      
      expect(result.error?.details).toEqual(details);
    });
  });

  describe('paginatedResponse', () => {
    it('returns correct paginated structure', () => {
      const data = [{ id: '1' }, { id: '2' }];
      const pagination = calculatePagination(1, 10, 25);
      const result = paginatedResponse(data, pagination);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        data,
        pagination
      });
    });
  });

  describe('notFoundResponse', () => {
    it('returns correct not found structure', () => {
      const result = notFoundResponse('Project', 'my-project');
      
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('NOT_FOUND');
      expect(result.error?.message).toContain('Project');
      expect(result.error?.message).toContain('my-project');
    });

    it('works without identifier', () => {
      const result = notFoundResponse('Project');
      
      expect(result.error?.message).toBe('Project not found');
    });
  });

  describe('validationErrorResponse', () => {
    it('returns correct validation error structure', () => {
      const errors = { email: 'Invalid email', name: 'Name is required' };
      const result = validationErrorResponse(errors);
      
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('VALIDATION_ERROR');
      expect(result.error?.details).toEqual(errors);
    });
  });

  describe('rateLimitResponse', () => {
    it('returns correct rate limit structure', () => {
      const result = rateLimitResponse(3600);
      
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('RATE_LIMITED');
      expect(result.error?.message).toContain('3600');
    });
  });

  describe('calculatePagination', () => {
    it('calculates pagination correctly for first page', () => {
      const result = calculatePagination(1, 10, 25);
      
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.total).toBe(25);
      expect(result.totalPages).toBe(3);
      expect(result.hasNext).toBe(true);
      expect(result.hasPrev).toBe(false);
    });

    it('calculates pagination correctly for middle page', () => {
      const result = calculatePagination(2, 10, 25);
      
      expect(result.hasNext).toBe(true);
      expect(result.hasPrev).toBe(true);
    });

    it('calculates pagination correctly for last page', () => {
      const result = calculatePagination(3, 10, 25);
      
      expect(result.hasNext).toBe(false);
      expect(result.hasPrev).toBe(true);
    });

    it('handles empty results', () => {
      const result = calculatePagination(1, 10, 0);
      
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.hasNext).toBe(false);
      expect(result.hasPrev).toBe(false);
    });
  });
});
