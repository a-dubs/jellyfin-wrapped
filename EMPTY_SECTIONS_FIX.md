# Fix: Empty Sections Should Skip Automatically

## Current Problem

Pages navigate away if empty, but:

1. **Navigation happens AFTER render** - causes flash of empty content
2. **Hardcoded NEXT_PAGE constants** - breaks if intermediate page is empty
3. **No centralized flow management** - each page handles skipping independently
4. **Navigation chain breaks** - if page 3 is empty, page 4's "previous" button is wrong

## Solution: Dynamic Page Flow System

### 1. Create Page Flow Manager (`src/lib/page-flow.ts`)

**Purpose**: Centralized system that:

- Defines all pages in order
- Checks if pages have data
- Builds dynamic navigation chains
- Skips empty pages automatically

### 2. Update PageContainer Component

**Change**: Use `getNextPage()` and `getPreviousPage()` from page-flow.ts instead of hardcoded paths.

**Before**:

```tsx
<PageContainer
  backgroundColor="var(--purple-8)"
  nextPage="/shows"
  previousPage="/TopTen"
>
```

**After**:

```tsx
import { useLocation } from 'react-router-dom';
import { getNextPage, getPreviousPage } from '@/lib/page-flow';

const location = useLocation();
const nextPage = getNextPage(location.pathname);
const previousPage = getPreviousPage(location.pathname);

<PageContainer
  backgroundColor="var(--purple-8)"
  nextPage={nextPage ?? undefined}
  previousPage={previousPage ?? undefined}
>
```

### 3. Update Pages to Check Data Early

**Pattern**: Check for empty data BEFORE rendering, redirect immediately.

**Current Pattern** (bad):

```tsx
// Renders component first, then navigates
if (!visibleMovies.length) {
  void navigate(NEXT_PAGE);
  return null;
}
```

**Better Pattern**:

```tsx
// Check in useEffect before render
useEffect(() => {
  if (!isLoading && !error && !visibleMovies.length) {
    const next = getNextPage(location.pathname);
    if (next) {
      void navigate(next);
    }
  }
}, [isLoading, error, visibleMovies.length, navigate, location.pathname]);

// Or better: use a hook
const { shouldSkip, nextPage } = usePageDataCheck({
  data: visibleMovies,
  isLoading,
  error,
});
```

### 4. Create usePageDataCheck Hook

**File**: `src/hooks/usePageDataCheck.ts`

```typescript
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextPage } from "@/lib/page-flow";

export function usePageDataCheck<T>({
  data,
  isLoading,
  error,
  isEmpty = (d) => !d || (Array.isArray(d) && d.length === 0),
}: {
  data: T;
  isLoading: boolean;
  error: Error | null;
  isEmpty?: (data: T) => boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !error && isEmpty(data)) {
      const next = getNextPage(location.pathname);
      if (next) {
        void navigate(next);
      }
    }
  }, [isLoading, error, data, location.pathname, navigate, isEmpty]);

  return {
    shouldSkip: !isLoading && !error && isEmpty(data),
    nextPage: getNextPage(location.pathname),
  };
}
```

### 5. Update All Pages

**Example**: MoviesReviewPage

```tsx
export default function MoviesReviewPage() {
  const { showBoundary } = useErrorBoundary();
  const location = useLocation();
  const { data: movies, isLoading, error } = useMovies();
  const [hiddenIds, setHiddenIds] = useState<string[]>(getCachedHiddenIds());

  const visibleMovies =
    movies?.filter(
      (movie: { id?: string }) => !hiddenIds.includes(movie.id ?? "")
    ) ?? [];

  // Use hook to handle skipping
  usePageDataCheck({
    data: visibleMovies,
    isLoading,
    error,
  });

  if (error) {
    showBoundary(error);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If empty, hook will navigate, but also check here for safety
  if (!visibleMovies.length) {
    return null;
  }

  const nextPage = getNextPage(location.pathname);
  const previousPage = getPreviousPage(location.pathname);

  return (
    <PageContainer
      backgroundColor="var(--purple-8)"
      nextPage={nextPage ?? undefined}
      previousPage={previousPage ?? undefined}
    >
      {/* ... */}
    </PageContainer>
  );
}
```

## Implementation Steps

1. ✅ Create `src/lib/page-flow.ts` (already created)
2. ✅ Update `PageContainer` to use dynamic navigation
3. ✅ Create `usePageDataCheck` hook
4. ✅ Update all pages to use new system
5. ✅ Remove hardcoded `NEXT_PAGE` constants
6. ✅ Update Navigation component to use page-flow config

## Benefits

1. **No empty sections**: Automatically skipped
2. **No flash**: Navigate before render
3. **Dynamic navigation**: Buttons always point to correct pages
4. **Centralized**: One place to manage flow
5. **Maintainable**: Easy to reorder or add pages

## Testing

After implementation, test:

1. Pages with no data skip automatically
2. Previous/Next buttons work correctly
3. Navigation menu shows only available pages
4. No flash of empty content
5. Flow works even if multiple consecutive pages are empty
