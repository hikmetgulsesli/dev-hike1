# Project Memory

## Completed Stories
### US-017: API Routes (Projects, Posts, Contact, Profile) [done]
- Files: Implemented all API endpoints for Projects, Posts, Contact, and Profile. Created lib/types.ts with TypeScript interfaces, lib/data.ts with mock data, lib/api-response.ts with response helpers. Implemented 12 API routes: GET /api/projects, GET /api/projects/[slug], GET /api/projects/featured, GET /api/posts, GET /api/posts/[slug], GET /api/posts/featured, GET /api/posts/categories, GET /api/posts/search, POST /api/contact (with rate limiting 5 req/hour per IP), GET /api/profile, GET /api/experience, GET /api/skills. All responses follow ApiResponse<T> format with proper error handling and status codes.

