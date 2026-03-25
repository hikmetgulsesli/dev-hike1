# Brainstorming Protocol

## When to Use

Use this protocol when starting a new feature, module, or architectural decision. If the task is a simple bug fix or one-liner, skip this and just code it.

## Steps

### 1. Clarify the Goal

- What problem are we solving?
- What does success look like?
- What are the constraints?

### 2. List Options

Brainstorm 3-5 approaches, even ones that seem wrong. Don't commit yet.

### 3. Evaluate

For each option, consider:
- **Complexity**: How hard to implement and maintain?
- **Scalability**: Will it handle growth?
- **Performance**: Any bottlenecks?
- **Developer experience**: Is it ergonomic?

### 4. Decide

Pick the best option with a clear reason. Document tradeoffs.

### 5. Validate

- Does this align with the PRD?
- Does this conflict with any existing decisions?
- Can we undo this if wrong?

## Architecture Decisions

For major decisions, write a short decision record:

```markdown
## ADR-001: Database Choice

**Status**: Accepted
**Date**: 2024-01-15

**Context**: Need persistent storage for user data.

**Decision**: PostgreSQL via Prisma

**Alternatives considered**:
- SQLite: simpler but doesn't scale
- MongoDB: overkill for our schema

**Consequences**: Need to manage migrations.
```

## Common Patterns

### Next.js App Router

- Server Components by default, Client Components only when needed (interactivity, hooks)
- Route Handlers for API endpoints
- Shared layouts for consistent shell

### State Management

- URL state for filters/search (shareable links)
- React Context for theme/locale
- Local state for transient UI

### API Design

- REST for CRUD resources
- Return consistent error shape: `{ error: { code, message } }`
- Validate with Zod on both client and server

### Styling

- Tailwind for utility classes
- CSS variables for design tokens
- No inline styles except dynamic values
