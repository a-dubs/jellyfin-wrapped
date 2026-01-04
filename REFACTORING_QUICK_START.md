# Quick Start: Refactoring Guide

## Most Impactful Changes (Start Here)

### 1. Create PageHeader Component

**Current Pattern** (repeated 15+ times):

```tsx
<div style={{ textAlign: "center" }}>
  <Title as={motion.h1} variants={itemVariants}>
    You Watched {count} Movies
  </Title>
  <p
    style={{
      fontSize: "1.125rem",
      color: "var(--gray-11)",
      marginTop: "0.5rem",
    }}
  >
    Your complete movie viewing history
  </p>
</div>
```

**New Component** (`src/components/PageHeader.tsx`):

```tsx
import { motion } from "framer-motion";
import { Title } from "./ui/styled";
import { itemVariants } from "@/lib/styled-variants";

interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
}

export function PageHeader({ title, description, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center">
      <Title as={motion.h1} variants={itemVariants}>
        {title}
      </Title>
      {description && (
        <p className="text-lg text-gray-11 mt-2">{description}</p>
      )}
      {subtitle && <p className="text-2xl text-white mt-2">{subtitle}</p>}
    </div>
  );
}
```

**Usage**:

```tsx
<PageHeader
  title={`You Watched ${count} Movies`}
  description="Your complete movie viewing history"
/>
```

**Impact**: Reduces 15+ duplicate code blocks to single component.

---

### 2. Create Theme Configuration

**New File** (`src/lib/theme.ts`):

```typescript
export const theme = {
  pages: {
    movies: "var(--purple-8)",
    shows: "var(--yellow-8)",
    audio: "var(--red-8)",
    genres: "var(--pink-8)",
    tv: "var(--blue-8)",
    actors: "var(--orange-8)",
    holidays: "var(--grass-8)",
    oldestMovie: "var(--teal-8)",
    oldestShow: "var(--lime-8)",
    musicVideos: "var(--red-8)",
    criticallyAcclaimed: "var(--cyan-8)",
    minutesPerDay: "var(--amber-8)",
    showOfTheMonth: "var(--bronze-8)",
    unfinishedShows: "var(--plum-8)",
    deviceStats: "var(--violet-8)",
    punchCard: "var(--indigo-8)",
    topTen: "var(--purple-8)",
  },
  colors: {
    text: {
      primary: "white",
      secondary: "var(--gray-11)",
      muted: "rgba(255, 255, 255, 0.7)",
    },
    navigation: {
      background: "rgba(45, 0, 247, 0.95)",
      title: "#FFD700",
      hover: "#FFD700",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },
  typography: {
    h1: "2rem",
    h2: "1.5rem",
    body: "1.125rem",
    caption: "0.875rem",
  },
} as const;
```

**Usage**:

```tsx
import { theme } from '@/lib/theme';

<PageContainer backgroundColor={theme.pages.movies}>
```

**Impact**: Single source of truth for all colors.

---

### 3. Create StandardPageLayout Component

**New File** (`src/components/StandardPageLayout.tsx`):

```tsx
import { ReactNode } from "react";
import { Container, Grid } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import PageContainer from "./PageContainer";
import { LoadingSpinner } from "./LoadingSpinner";
import { PageHeader, PageHeaderProps } from "./PageHeader";
import { theme } from "@/lib/theme";

interface StandardPageLayoutProps {
  pageKey: keyof typeof theme.pages;
  header: PageHeaderProps;
  children: ReactNode;
  nextPage?: string;
  previousPage?: string;
  loading?: boolean;
  error?: Error | null;
  emptyRedirect?: string;
  emptyCondition?: boolean;
}

export function StandardPageLayout({
  pageKey,
  header,
  children,
  nextPage,
  previousPage,
  loading = false,
  error = null,
  emptyRedirect,
  emptyCondition = false,
}: StandardPageLayoutProps) {
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  if (error) {
    showBoundary(error);
  }

  if (loading) {
    return <LoadingSpinner backgroundColor={theme.pages[pageKey]} />;
  }

  if (emptyCondition && emptyRedirect) {
    void navigate(emptyRedirect);
    return null;
  }

  return (
    <PageContainer
      backgroundColor={theme.pages[pageKey]}
      nextPage={nextPage}
      previousPage={previousPage}
    >
      <Container size="4" p="4">
        <Grid gap="6">
          <PageHeader {...header} />
          {children}
        </Grid>
      </Container>
    </PageContainer>
  );
}
```

**Usage** (Before):

```tsx
export default function MoviesReviewPage() {
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const { data: movies, isLoading, error } = useMovies();
  const [hiddenIds, setHiddenIds] = useState<string[]>(getCachedHiddenIds());

  if (error) {
    showBoundary(error);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const visibleMovies =
    movies?.filter(
      (movie: { id?: string }) => !hiddenIds.includes(movie.id ?? "")
    ) ?? [];

  if (!visibleMovies.length) {
    void navigate(NEXT_PAGE);
    return null;
  }

  return (
    <PageContainer
      backgroundColor="var(--purple-8)"
      nextPage={NEXT_PAGE}
      previousPage="/TopTen"
    >
      <Container size="4" p="4">
        <Grid gap="6">
          <div style={{ textAlign: "center" }}>
            <Title as={motion.h1} variants={itemVariants}>
              You Watched {visibleMovies.length} Movies
            </Title>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--gray-11)",
                marginTop: "0.5rem",
              }}
            >
              Your complete movie viewing history
            </p>
          </div>
          {/* content */}
        </Grid>
      </Container>
    </PageContainer>
  );
}
```

**Usage** (After):

```tsx
export default function MoviesReviewPage() {
  const { data: movies, isLoading, error } = useMovies();
  const [hiddenIds, setHiddenIds] = useState<string[]>(getCachedHiddenIds());

  const visibleMovies =
    movies?.filter(
      (movie: { id?: string }) => !hiddenIds.includes(movie.id ?? "")
    ) ?? [];

  return (
    <StandardPageLayout
      pageKey="movies"
      header={{
        title: `You Watched ${visibleMovies.length} Movies`,
        description: "Your complete movie viewing history",
      }}
      nextPage="/shows"
      previousPage="/TopTen"
      loading={isLoading}
      error={error}
      emptyRedirect="/shows"
      emptyCondition={!visibleMovies.length}
    >
      <Grid columns={{ initial: "2", sm: "3", md: "4", lg: "5" }} gap="4">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} item={movie} />
        ))}
      </Grid>
    </StandardPageLayout>
  );
}
```

**Impact**: Reduces page component code by ~60%, eliminates duplicate loading/error handling.

---

### 4. Create Page Configuration

**New File** (`src/lib/page-config.ts`):

```typescript
export const pageConfig = {
  "/TopTen": {
    backgroundColor: "movies", // key from theme.pages
    nextPage: "/movies",
    previousPage: "/loading",
  },
  "/movies": {
    backgroundColor: "movies",
    nextPage: "/shows",
    previousPage: "/TopTen",
  },
  "/shows": {
    backgroundColor: "shows",
    nextPage: "/audio",
    previousPage: "/movies",
  },
  // ... all pages
} as const;
```

**Usage**:

```tsx
import { useLocation } from "react-router-dom";
import { pageConfig } from "@/lib/page-config";

const location = useLocation();
const config = pageConfig[location.pathname];
```

**Impact**: Centralized navigation flow, easy to reorder pages.

---

### 5. Migrate Navigation to Tailwind

**Current** (`src/components/Navigation.tsx`):

- Uses Stitches with hardcoded colors
- Inline styles mixed in

**Refactored**:

```tsx
// Use Tailwind classes instead of Stitches
const SideNav = styled("nav", {
  // ... becomes className="fixed top-0 left-0 h-screen w-[280px] bg-nav-background ..."
});
```

**Impact**: Easier to theme, consistent with rest of app.

---

## Migration Checklist

### Phase 1: Foundation (Week 1)

- [ ] Create `src/lib/theme.ts` with color configuration
- [ ] Create `src/components/PageHeader.tsx`
- [ ] Create `src/components/StandardPageLayout.tsx`
- [ ] Migrate 2-3 pages to use new components

### Phase 2: Migration (Week 2-3)

- [ ] Migrate all page components to StandardPageLayout
- [ ] Create `src/lib/page-config.ts`
- [ ] Update Navigation to use theme colors
- [ ] Remove duplicate code from pages

### Phase 3: Styling (Week 4)

- [ ] Migrate Navigation to Tailwind
- [ ] Migrate PageContainer to Tailwind
- [ ] Update tailwind.config.js with theme tokens
- [ ] Remove Stitches dependencies (if possible)

### Phase 4: Polish (Week 5)

- [ ] Extract remaining inline styles
- [ ] Create typography system
- [ ] Add theme switcher (optional)
- [ ] Document components

---

## Quick Wins (Do These First)

1. **Create PageHeader component** - Immediate 15+ file reduction
2. **Create theme.ts** - Single source of truth for colors
3. **Migrate one page** - Prove the pattern works
4. **Create StandardPageLayout** - Massive code reduction

---

## Code Reduction Estimates

| Component        | Current LOC | After Refactor | Reduction |
| ---------------- | ----------- | -------------- | --------- |
| MoviesReviewPage | ~72         | ~30            | 58%       |
| ShowReviewPage   | ~86         | ~35            | 59%       |
| AudioReviewPage  | ~62         | ~25            | 60%       |
| GenreReviewPage  | ~107        | ~40            | 63%       |
| **Total Pages**  | **~1500**   | **~600**       | **60%**   |

---

## Testing Strategy

1. **Visual Regression**: Screenshot each page before/after
2. **Functional**: Ensure navigation still works
3. **Performance**: Check bundle size impact
4. **Accessibility**: Verify no regressions

---

## Rollback Plan

- Keep old components until migration complete
- Use feature flags if needed
- Migrate incrementally (one page at a time)
- Test thoroughly before removing old code
