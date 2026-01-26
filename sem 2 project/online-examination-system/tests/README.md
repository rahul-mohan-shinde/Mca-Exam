# Testing Structure

## Overview

This directory contains all test files organized by test type and module.

## Structure

```
tests/
├── unit/              # Unit tests for individual functions
├── integration/       # Integration tests for API endpoints
└── e2e/              # End-to-end tests for complete flows
```

## Test Organization

### Unit Tests
- Test individual functions and methods
- Mock external dependencies
- Fast execution
- High coverage target: 80%+

### Integration Tests
- Test API endpoints
- Test database operations
- Test service integrations
- Use test database

### E2E Tests
- Test complete user flows
- Test frontend-backend integration
- Use test environment
- Browser automation (Cypress/Playwright)

## Test Files Structure

### Unit Tests Example
```
tests/unit/
├── auth/
│   ├── auth.service.spec.ts
│   ├── token.service.spec.ts
│   └── password.service.spec.ts
├── question-bank/
│   └── question.service.spec.ts
└── exam-management/
    └── exam.service.spec.ts
```

### Integration Tests Example
```
tests/integration/
├── auth/
│   ├── login.test.ts
│   └── register.test.ts
├── exams/
│   └── exam-creation.test.ts
└── results/
    └── result-calculation.test.ts
```

### E2E Tests Example
```
tests/e2e/
├── student-flow.spec.ts
├── admin-flow.spec.ts
└── exam-taking-flow.spec.ts
```

## Test Skeleton

### Unit Test Example
```typescript
describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(() => {
    // Setup test dependencies
  });
  
  it('should authenticate user with valid credentials', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Integration Test Example
```typescript
describe('POST /api/auth/login', () => {
  it('should return token for valid credentials', async () => {
    // Test implementation
  });
});
```

## Running Tests

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests
npm run test
```

## Coverage

Target coverage: 80%+
Use tools: Jest, Istanbul, or similar

