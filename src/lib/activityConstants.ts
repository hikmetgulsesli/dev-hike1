// Activity Tracking Constants - US-006

import { ActivityType, ActivityOutcome } from '../generated/prisma/index.js';

// Activity type labels for UI display
export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  [ActivityType.PHONE]: 'Phone Call',
  [ActivityType.EMAIL]: 'Email',
  [ActivityType.IN_PERSON]: 'In Person',
  [ActivityType.VIDEO]: 'Video Call',
} as const;

// Activity outcome labels for UI display
export const ACTIVITY_OUTCOME_LABELS: Record<ActivityOutcome, string> = {
  [ActivityOutcome.POSITIVE]: 'Positive',
  [ActivityOutcome.NEUTRAL]: 'Neutral',
  [ActivityOutcome.NEGATIVE]: 'Negative',
  [ActivityOutcome.QUOTE_REQUESTED]: 'Quote Requested',
} as const;

// Activity type icons (for frontend reference)
export const ACTIVITY_TYPE_ICONS: Record<ActivityType, string> = {
  [ActivityType.PHONE]: 'phone',
  [ActivityType.EMAIL]: 'mail',
  [ActivityType.IN_PERSON]: 'user',
  [ActivityType.VIDEO]: 'video',
} as const;

// Outcome colors for UI (as per design standards)
export const OUTCOME_COLORS: Record<ActivityOutcome, string> = {
  [ActivityOutcome.POSITIVE]: '#22c55e',    // Green
  [ActivityOutcome.NEUTRAL]: '#94a3b8',     // Gray
  [ActivityOutcome.NEGATIVE]: '#ef4444',    // Red
  [ActivityOutcome.QUOTE_REQUESTED]: '#3b82f6', // Blue
} as const;

// Validation constants
export const ACTIVITY_VALIDATION = {
  NOTES_MIN_LENGTH: 0,
  NOTES_MAX_LENGTH: 2000,
  MAX_ACTIVITIES_PER_PAGE: 100,
  DEFAULT_PAGE_SIZE: 20,
} as const;

// Date format constants
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  ISO_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss',
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
} as const;

// API endpoints (for reference)
export const ACTIVITY_ENDPOINTS = {
  ACTIVITIES: '/api/activities',
  ACTIVITY_BY_ID: (id: string) => `/api/activities/${id}`,
  CUSTOMERS: '/api/customers',
  CUSTOMER_BY_ID: (id: string) => `/api/customers/${id}`,
  CUSTOMER_ACTIVITIES: (customerId: string) => `/api/customers/${customerId}/activities`,
} as const;
