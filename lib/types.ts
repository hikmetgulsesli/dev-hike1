// Core Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

// Project Types
export interface TechItem {
  id: string;
  name: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tool' | 'mobile';
  url?: string;
}

export interface Project extends BaseEntity {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  category: 'web' | 'mobile' | 'open-source' | 'freelance';
  techStack: TechItem[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
  content: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  client?: string;
  duration?: string;
  sortOrder?: number;
}

// Blog Types
export interface Author {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  location?: string;
  social: SocialLinks;
  skills?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
  instagram?: string;
  youtube?: string;
}

export interface BlogPost extends BaseEntity {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  category: 'teknik' | 'kariyer' | 'kisisel' | 'tutorial' | 'tasarim';
  tags: string[];
  readTime: number;
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
  content: string;
  author: Author;
  featured: boolean;
  pinned: boolean;
  seo?: SEO;
}

// Profile Types
export interface Experience extends BaseEntity {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  logo?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  achievements?: string[];
}

export interface Education extends BaseEntity {
  id: string;
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  proficiency?: number;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'design' | 'soft-skills';
  years?: number;
  projects?: number;
}

// Contact Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}

// UI State Types
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Filter {
  category?: string;
  search?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}
