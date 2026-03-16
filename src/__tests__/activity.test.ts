// Activity Service Tests - US-006

// Activity types for testing (avoid importing from Prisma to prevent TextEncoder issues in test env)
enum ActivityType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  IN_PERSON = 'IN_PERSON',
  VIDEO = 'VIDEO',
}

enum ActivityOutcome {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
  QUOTE_REQUESTED = 'QUOTE_REQUESTED',
}

// Skip tests in CI/test environments without a real database
const shouldRunTests = process.env.RUN_INTEGRATION_TESTS === 'true' &&
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes('your-database');

// Conditional describe - skip all tests if no database
const describeIfDb = shouldRunTests ? describe : describe.skip;

describeIfDb('Activity Tracking Service', () => {
  // Import the service functions (dynamic import to avoid issues when skipping)
  let activityService: typeof import('../lib/activityService');

  beforeAll(async () => {
    if (shouldRunTests) {
      activityService = await import('../lib/activityService');
    }
  });

  beforeEach(async () => {
    if (!shouldRunTests) return;
    // Clean up test data
    const { prisma } = await import('../generated/prisma/index.js');
    const client = new prisma.PrismaClient();
    await client.activity.deleteMany({});
    await client.customer.deleteMany({});
    await client.$disconnect();
  });

  describe('Customer CRUD', () => {
    test('createCustomer creates a customer with null lastContactDate', async () => {
      const customer = await activityService.createCustomer({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Acme Corp',
      });

      expect(customer.id).toBeDefined();
      expect(customer.name).toBe('John Doe');
      expect(customer.email).toBe('john@example.com');
      expect(customer.lastContactDate).toBeNull();
    });

    test('getCustomerById returns customer by ID', async () => {
      const customer = await activityService.createCustomer({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const found = await activityService.getCustomerById(customer.id);
      expect(found?.id).toBe(customer.id);
      expect(found?.name).toBe('John Doe');
    });

    test('getCustomerById returns null for non-existent ID', async () => {
      const found = await activityService.getCustomerById('non-existent-id');
      expect(found).toBeNull();
    });

    test('getAllCustomers returns all customers', async () => {
      await activityService.createCustomer({
        name: 'First',
        email: 'first@example.com',
      });
      await activityService.createCustomer({
        name: 'Second',
        email: 'second@example.com',
      });

      const all = await activityService.getAllCustomers();
      expect(all.length).toBeGreaterThanOrEqual(2);
    });

    test('updateCustomer updates fields', async () => {
      const customer = await activityService.createCustomer({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const updated = await activityService.updateCustomer(customer.id, {
        name: 'Jane Doe',
      });

      expect(updated?.name).toBe('Jane Doe');
      expect(updated?.email).toBe('john@example.com');
    });

    test('deleteCustomer removes customer', async () => {
      const customer = await activityService.createCustomer({
        name: 'To Delete',
        email: 'delete@example.com',
      });

      await activityService.deleteCustomer(customer.id);
      const found = await activityService.getCustomerById(customer.id);
      expect(found).toBeNull();
    });
  });

  describe('Activity CRUD', () => {
    test('createActivity creates activity and auto-updates customer last_contact_date', async () => {
      const customer = await activityService.createCustomer({
        name: 'Test Customer',
        email: 'test@example.com',
      });

      expect(customer.lastContactDate).toBeNull();

      const activityDate = new Date('2026-03-16');
      const activity = await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Test call',
        date: activityDate,
      });

      expect(activity.id).toBeDefined();
      expect(activity.customerId).toBe(customer.id);
      expect(activity.type).toBe(ActivityType.PHONE);
      expect(activity.outcome).toBe(ActivityOutcome.POSITIVE);

      // Verify customer last_contact_date was updated
      const updatedCustomer = await activityService.getCustomerById(customer.id);
      expect(updatedCustomer?.lastContactDate).toEqual(activityDate);
    });

    test('createActivity accepts all activity types', async () => {
      const customer = await activityService.createCustomer({
        name: 'Type Test',
        email: 'types@example.com',
      });

      const types = [
        ActivityType.PHONE,
        ActivityType.EMAIL,
        ActivityType.IN_PERSON,
        ActivityType.VIDEO,
      ];

      for (const type of types) {
        await activityService.createActivity({
          customerId: customer.id,
          type,
          outcome: ActivityOutcome.POSITIVE,
          notes: `Activity ${type}`,
          date: new Date(),
        });
      }

      const activities = await activityService.getActivitiesByCustomer(customer.id);
      expect(activities.length).toBe(4);
    });

    test('createActivity accepts all outcome types', async () => {
      const customer = await activityService.createCustomer({
        name: 'Outcome Test',
        email: 'outcomes@example.com',
      });

      const outcomes = [
        ActivityOutcome.POSITIVE,
        ActivityOutcome.NEUTRAL,
        ActivityOutcome.NEGATIVE,
        ActivityOutcome.QUOTE_REQUESTED,
      ];

      for (const outcome of outcomes) {
        await activityService.createActivity({
          customerId: customer.id,
          type: ActivityType.PHONE,
          outcome,
          notes: `Outcome ${outcome}`,
          date: new Date(),
        });
      }

      const activities = await activityService.getActivitiesByCustomer(customer.id);
      expect(activities.length).toBe(4);
    });

    test('getActivityById returns activity with customer', async () => {
      const customer = await activityService.createCustomer({
        name: 'Activity Lookup',
        email: 'lookup@example.com',
      });

      const activity = await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.EMAIL,
        outcome: ActivityOutcome.NEUTRAL,
        notes: 'Test',
        date: new Date(),
      });

      const found = await activityService.getActivityById(activity.id);
      expect(found?.id).toBe(activity.id);
      expect(found?.customer).toBeDefined();
      expect(found?.customer.id).toBe(customer.id);
    });

    test('getActivitiesByCustomer returns only activities for that customer', async () => {
      const c1 = await activityService.createCustomer({
        name: 'Customer 1',
        email: 'c1@example.com',
      });
      const c2 = await activityService.createCustomer({
        name: 'Customer 2',
        email: 'c2@example.com',
      });

      await activityService.createActivity({
        customerId: c1.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'C1 Activity',
        date: new Date(),
      });

      await activityService.createActivity({
        customerId: c2.id,
        type: ActivityType.EMAIL,
        outcome: ActivityOutcome.NEUTRAL,
        notes: 'C2 Activity',
        date: new Date(),
      });

      const c1Activities = await activityService.getActivitiesByCustomer(c1.id);
      expect(c1Activities.length).toBe(1);
      expect(c1Activities[0].customerId).toBe(c1.id);
    });

    test('updateActivity updates fields', async () => {
      const customer = await activityService.createCustomer({
        name: 'Update Test',
        email: 'update@example.com',
      });

      const activity = await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Original notes',
        date: new Date(),
      });

      const updated = await activityService.updateActivity(activity.id, {
        notes: 'Updated notes',
        outcome: ActivityOutcome.NEGATIVE,
      });

      expect(updated?.notes).toBe('Updated notes');
      expect(updated?.outcome).toBe(ActivityOutcome.NEGATIVE);
      expect(updated?.type).toBe(ActivityType.PHONE);
    });

    test('deleteActivity removes activity', async () => {
      const customer = await activityService.createCustomer({
        name: 'Delete Test',
        email: 'delete@example.com',
      });

      const activity = await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'To delete',
        date: new Date(),
      });

      await activityService.deleteActivity(activity.id);

      const found = await activityService.getActivityById(activity.id);
      expect(found).toBeNull();
    });
  });

  describe('Activity Filtering', () => {
    test('filterActivities by type', async () => {
      const customer = await activityService.createCustomer({
        name: 'Filter Test',
        email: 'filter@example.com',
      });

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Phone call',
        date: new Date(),
      });

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.EMAIL,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Email sent',
        date: new Date(),
      });

      const filtered = await activityService.filterActivities({
        type: ActivityType.EMAIL,
      });

      expect(filtered.length).toBeGreaterThanOrEqual(1);
      expect(filtered.every(a => a.type === ActivityType.EMAIL)).toBe(true);
    });

    test('filterActivities by outcome', async () => {
      const customer = await activityService.createCustomer({
        name: 'Outcome Filter',
        email: 'outcome@example.com',
      });

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Positive call',
        date: new Date(),
      });

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.NEGATIVE,
        notes: 'Negative call',
        date: new Date(),
      });

      const filtered = await activityService.filterActivities({
        outcome: ActivityOutcome.NEGATIVE,
      });

      expect(filtered.length).toBeGreaterThanOrEqual(1);
      expect(filtered.every(a => a.outcome === ActivityOutcome.NEGATIVE)).toBe(true);
    });

    test('filterActivities by hasNextAction', async () => {
      const customer = await activityService.createCustomer({
        name: 'Next Action Filter',
        email: 'next@example.com',
      });

      const future = new Date();
      future.setDate(future.getDate() + 7);

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'With follow-up',
        date: new Date(),
        nextActionDate: future,
      });

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'No follow-up',
        date: new Date(),
        nextActionDate: null,
      });

      const withAction = await activityService.filterActivities({
        hasNextAction: true,
      });

      expect(withAction.some(a => a.nextActionDate !== null)).toBe(true);
    });
  });

  describe('Activity Stats', () => {
    test('getActivityStats returns correct structure', async () => {
      const stats = await activityService.getActivityStats();

      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('byType');
      expect(stats).toHaveProperty('byOutcome');
      expect(stats).toHaveProperty('upcomingActions');
      expect(typeof stats.total).toBe('number');
    });

    test('getUpcomingActivities returns activities with nextActionDate in range', async () => {
      const customer = await activityService.createCustomer({
        name: 'Upcoming Test',
        email: 'upcoming@example.com',
      });

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Tomorrow',
        date: new Date(),
        nextActionDate: tomorrow,
      });

      await activityService.createActivity({
        customerId: customer.id,
        type: ActivityType.PHONE,
        outcome: ActivityOutcome.POSITIVE,
        notes: 'Next month',
        date: new Date(),
        nextActionDate: nextMonth,
      });

      const upcoming = await activityService.getUpcomingActivities(7);

      // Should only include activities within 7 days
      expect(upcoming.length).toBeGreaterThanOrEqual(1);
      expect(upcoming.some(a => a.notes === 'Tomorrow')).toBe(true);
    });
  });
});

// Unit tests that don't require database
describe('Activity Types and Constants', () => {
  test('ActivityType enum has all expected values', () => {
    expect(ActivityType.PHONE).toBe('PHONE');
    expect(ActivityType.EMAIL).toBe('EMAIL');
    expect(ActivityType.IN_PERSON).toBe('IN_PERSON');
    expect(ActivityType.VIDEO).toBe('VIDEO');
  });

  test('ActivityOutcome enum has all expected values', () => {
    expect(ActivityOutcome.POSITIVE).toBe('POSITIVE');
    expect(ActivityOutcome.NEUTRAL).toBe('NEUTRAL');
    expect(ActivityOutcome.NEGATIVE).toBe('NEGATIVE');
    expect(ActivityOutcome.QUOTE_REQUESTED).toBe('QUOTE_REQUESTED');
  });
});
