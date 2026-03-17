// Activity Tracking Types - US-006

import { ActivityType, ActivityOutcome } from '../generated/prisma/index.js';

export { ActivityType, ActivityOutcome };

// Activity with customer info (for API responses)
export interface ActivityWithCustomer {
  id: string;
  customerId: string;
  type: ActivityType;
  outcome: ActivityOutcome;
  notes: string | null;
  date: Date;
  nextActionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
}

// Customer entity
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  lastContactDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for Activity operations
export interface CreateActivityInput {
  customerId: string;
  type: ActivityType;
  outcome: ActivityOutcome;
  notes?: string;
  date: Date;
  nextActionDate?: Date | null;
}

export interface UpdateActivityInput {
  type?: ActivityType;
  outcome?: ActivityOutcome;
  notes?: string;
  date?: Date;
  nextActionDate?: Date | null;
}

// DTOs for Customer operations
export interface CreateCustomerInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface UpdateCustomerInput {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

// Activity filter options
export interface ActivityFilter {
  customerId?: string;
  type?: ActivityType;
  outcome?: ActivityOutcome;
  startDate?: Date;
  endDate?: Date;
  hasNextAction?: boolean;
}

// Activity summary/stats
export interface ActivityStats {
  total: number;
  byType: Record<ActivityType, number>;
  byOutcome: Record<ActivityOutcome, number>;
  upcomingActions: number;
}
