// Activity Service - US-006
// CRUD operations with customer last_contact_date auto-update

import { PrismaClient, ActivityType, ActivityOutcome } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

// ==================== CUSTOMER CRUD ====================

export async function createCustomer(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}) {
  return prisma.customer.create({
    data: {
      ...data,
      lastContactDate: null,
    },
  });
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: { activities: true },
  });
}

export async function getAllCustomers() {
  return prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateCustomer(
  id: string,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
    company: string;
  }>
) {
  return prisma.customer.update({
    where: { id },
    data,
  });
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: { id },
  });
}

/**
 * Update customer's last_contact_date
 * Called automatically when an activity is created
 */
export async function updateCustomerLastContactDate(
  customerId: string,
  contactDate: Date
) {
  return prisma.customer.update({
    where: { id: customerId },
    data: { lastContactDate: contactDate },
  });
}

// ==================== ACTIVITY CRUD ====================

export async function createActivity(data: {
  customerId: string;
  type: ActivityType;
  outcome: ActivityOutcome;
  notes?: string;
  date: Date;
  nextActionDate?: Date | null;
}) {
  // Create activity
  const activity = await prisma.activity.create({
    data: {
      ...data,
      nextActionDate: data.nextActionDate ?? null,
    },
  });

  // Auto-update customer's last_contact_date
  await updateCustomerLastContactDate(data.customerId, data.date);

  return activity;
}

export async function getActivityById(id: string) {
  return prisma.activity.findUnique({
    where: { id },
    include: { customer: true },
  });
}

export async function getAllActivities() {
  return prisma.activity.findMany({
    orderBy: { date: 'desc' },
    include: { customer: true },
  });
}

export async function getActivitiesByCustomer(customerId: string) {
  return prisma.activity.findMany({
    where: { customerId },
    orderBy: { date: 'desc' },
  });
}

export async function filterActivities(filters: {
  customerId?: string;
  type?: ActivityType;
  outcome?: ActivityOutcome;
  startDate?: Date;
  endDate?: Date;
  hasNextAction?: boolean;
}) {
  const where: Record<string, unknown> = {};

  if (filters.customerId) {
    where.customerId = filters.customerId;
  }
  if (filters.type) {
    where.type = filters.type;
  }
  if (filters.outcome) {
    where.outcome = filters.outcome;
  }
  if (filters.startDate || filters.endDate) {
    where.date = {};
    if (filters.startDate) {
      (where.date as Record<string, Date>).gte = filters.startDate;
    }
    if (filters.endDate) {
      (where.date as Record<string, Date>).lte = filters.endDate;
    }
  }
  if (filters.hasNextAction !== undefined) {
    where.nextActionDate = filters.hasNextAction ? { not: null } : null;
  }

  return prisma.activity.findMany({
    where,
    orderBy: { date: 'desc' },
    include: { customer: true },
  });
}

export async function updateActivity(
  id: string,
  data: Partial<{
    type: ActivityType;
    outcome: ActivityOutcome;
    notes: string;
    date: Date;
    nextActionDate: Date | null;
  }>
) {
  return prisma.activity.update({
    where: { id },
    data,
    include: { customer: true },
  });
}

export async function deleteActivity(id: string) {
  const activity = await prisma.activity.findUnique({
    where: { id },
  });

  if (!activity) return null;

  const deleted = await prisma.activity.delete({
    where: { id },
  });

  // Update customer's last_contact_date to the next most recent activity
  const customerActivities = await getActivitiesByCustomer(activity.customerId);
  const mostRecent = customerActivities[0];
  await updateCustomerLastContactDate(
    activity.customerId,
    mostRecent?.date ?? null
  );

  return deleted;
}

// ==================== STATS & ANALYTICS ====================

export async function getActivityStats() {
  const [
    total,
    byType,
    byOutcome,
    upcomingActions,
  ] = await Promise.all([
    prisma.activity.count(),
    prisma.activity.groupBy({
      by: ['type'],
      _count: { type: true },
    }),
    prisma.activity.groupBy({
      by: ['outcome'],
      _count: { outcome: true },
    }),
    prisma.activity.count({
      where: {
        nextActionDate: {
          gte: new Date(),
        },
      },
    }),
  ]);

  const typeCounts = Object.fromEntries(
    Object.values(ActivityType).map((type) => [
      type,
      byType.find((t) => t.type === type)?._count.type ?? 0,
    ])
  ) as Record<ActivityType, number>;

  const outcomeCounts = Object.fromEntries(
    Object.values(ActivityOutcome).map((outcome) => [
      outcome,
      byOutcome.find((o) => o.outcome === outcome)?._count.outcome ?? 0,
    ])
  ) as Record<ActivityOutcome, number>;

  return {
    total,
    byType: typeCounts,
    byOutcome: outcomeCounts,
    upcomingActions,
  };
}

/**
 * Get upcoming scheduled activities (next actions)
 */
export async function getUpcomingActivities(days: number = 7) {
  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + days);

  return prisma.activity.findMany({
    where: {
      nextActionDate: {
        gte: now,
        lte: future,
      },
    },
    orderBy: { nextActionDate: 'asc' },
    include: { customer: true },
  });
}
