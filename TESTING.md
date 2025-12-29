# Testing Guide

This project includes a comprehensive test suite using Jest.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized in the `src/__tests__/` directory:

```
src/__tests__/
├── config.test.ts           # Configuration loading tests
├── market-fetcher.test.ts   # Market data fetching tests
├── screener.test.ts         # Market screening logic tests
├── ai-researcher.test.ts    # AI analysis tests
├── discord-notifier.test.ts # Discord notification tests
├── state-manager.test.ts    # State persistence tests
└── index.test.ts            # Integration tests
```

## What's Tested

### Unit Tests

Each module has comprehensive unit tests covering:

- **config.ts**: Environment variable loading, default values, validation
- **market-fetcher.ts**: API calls, pagination, order book enrichment, error handling
- **screener.ts**: Filtering logic, scoring, sorting, edge cases
- **ai-researcher.ts**: Query generation, web research, AI reasoning, response parsing
- **discord-notifier.ts**: Message formatting, embeds, error handling
- **state-manager.ts**: File I/O, caching, cleanup, statistics

### Integration Tests

The `index.test.ts` file contains integration tests that verify:

- All components can be instantiated together
- Configuration flows correctly through the system
- Error handling works across component boundaries

## Test Coverage

To see detailed coverage information:

```bash
npm run test:coverage
```

This generates:
- Console output with coverage percentages
- HTML report in `coverage/` directory (open `coverage/index.html` in a browser)
- LCOV report for CI/CD integration

## Writing Tests

### Example Test Structure

```typescript
import { MyModule } from '../my-module';

describe('MyModule', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  describe('myMethod', () => {
    it('should handle normal case', () => {
      // Arrange
      const module = new MyModule();
      
      // Act
      const result = module.myMethod('input');
      
      // Assert
      expect(result).toBe('expected');
    });

    it('should handle error case', () => {
      const module = new MyModule();
      
      expect(() => module.myMethod('bad')).toThrow('Error message');
    });
  });
});
```

### Mocking External Dependencies

Tests mock external dependencies like:
- `node-fetch` for HTTP requests
- `@polymarket/clob-client` for order book data
- File system operations for state management

Example:

```typescript
jest.mock('node-fetch');
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

mockFetch.mockResolvedValue({
  ok: true,
  json: async () => ({ data: 'test' }),
} as any);
```

## Continuous Integration

Tests run automatically in GitHub Actions on:
- Every push to `main`
- Every pull request

The workflow fails if:
- Any test fails
- Type checking fails
- Build fails

## Best Practices

1. **Test behavior, not implementation**: Focus on what the code does, not how it does it
2. **Use descriptive test names**: `it('should return error when API key is missing')`
3. **Keep tests isolated**: Each test should be independent
4. **Mock external dependencies**: Don't make real API calls in tests
5. **Test edge cases**: Empty inputs, null values, boundary conditions
6. **Clean up after tests**: Remove test files, restore mocks

## Debugging Tests

To debug a specific test:

```bash
# Run a specific test file
npm test -- config.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should load config"

# Run with verbose output
npm test -- --verbose
```

## Common Issues

### Tests timing out

If tests are timing out, increase the timeout:

```typescript
it('should handle long operation', async () => {
  // Test code
}, 10000); // 10 second timeout
```

### Mock not working

Make sure mocks are set up before importing the module:

```typescript
jest.mock('node-fetch'); // Must be before import
import { MyModule } from '../my-module';
```

### File system tests failing

Make sure to clean up test files:

```typescript
afterEach(() => {
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
  }
});
```

