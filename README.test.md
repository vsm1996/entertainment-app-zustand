# Testing Guide

This project uses Jest and React Testing Library for testing.

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode (reruns tests on file changes)
yarn run test:watch

# Run tests with coverage report
yarn run test:coverage
```

## Test Structure

### Unit Tests

- **Store Tests** (`__tests__/store/store.test.ts`): Tests for Zustand store functionality
  - Bookmark toggling
  - Search term management
  - Filtering by category, bookmarks, and search
  - Trending and recommended data fetching

- **Component Tests** (`__tests__/components/`): Tests for UI components
  - `Card.test.tsx`: Card component rendering and interactions
  - `Input.test.tsx`: Search input behavior
  - `Navbar.test.tsx`: Navigation links and active states

### Integration Tests

- **Page Tests** (`__tests__/pages/`): Tests for page components
  - `Home.test.tsx`: Home page with trending and recommended sections
  - `Movies.test.tsx`: Movies page with category filtering
  - `Bookmarks.test.tsx`: Bookmarks page with separate movie/TV sections

- **User Flow Tests** (`__tests__/integration/userFlows.test.tsx`): End-to-end user scenarios
  - Bookmarking flow: Add/remove bookmarks and verify in bookmarks page
  - Search flow: Search across all pages and filter results
  - Navigation flow: Filter consistency across page navigation
  - Combined filters: Multiple filters working together

## Test Coverage

The test suite covers:
- State management with Zustand
- User interactions (clicking, typing, bookmarking)
- Search and filter functionality
- Navigation between pages
- Combined filter scenarios

## Mocks

The following are mocked in `jest.setup.js`:
- Next.js router (`next/navigation`)
- Next.js Image component
- `window.matchMedia` for responsive design

## Writing New Tests

When adding new features, ensure you:
1. Add unit tests for new store methods
2. Add component tests for new UI components
3. Add integration tests for user flows involving multiple components
4. Run `npm run test:coverage` to ensure adequate coverage
