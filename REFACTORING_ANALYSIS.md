# Refactoring Analysis: Making Jellyfin Wrapped More DRY and Style-Overhaul Ready

## Executive Summary

This analysis identifies key opportunities to make the codebase more DRY (Don't Repeat Yourself) and significantly easier to refactor for a complete style overhaul. The current codebase has extensive duplication, hardcoded styles scattered throughout, and inconsistent styling approaches that make design changes difficult.

## Critical Issues Identified

### 1. **Massive Inline Style Duplication**

**Problem**: Nearly every page component repeats the same header pattern with inline styles:

```tsx
<div style={{ textAlign: "center" }}>
  <Title as={motion.h1} variants={itemVariants}>
    {title}
  </Title>
  <p
    style={{
      fontSize: "1.125rem",
      color: "var(--gray-11)",
      marginTop: "0.5rem",
    }}
  >
    {description}
  </p>
</div>
```

**Found in**: MoviesReviewPage, ShowReviewPage, AudioReviewPage, GenreReviewPage, HolidayReviewPage, OldestMoviePage, OldestShowPage, MusicVideoPage, DeviceStatsPage, CriticallyAcclaimedPage, FavoriteActorsPage, MinutesPlayedPerDayPage, ShowOfTheMonthPage, UnfinishedShowsPage, LiveTvReviewPage

**Impact**: Changing header styling requires editing 15+ files.

### 2. **Hardcoded Color Values Everywhere**

**Problem**: Colors are hardcoded using multiple approaches:

- Radix UI CSS variables: `var(--purple-8)`, `var(--yellow-8)`, `var(--red-8)`
- Hex colors: `#FFD700`, `#2D00F7`, `#4D2DFF`
- RGB/RGBA: `rgba(255, 255, 255, 0.1)`
- HSL: `hsl(var(--background))`

**Examples**:

- PageContainer backgrounds: Each page uses different `backgroundColor` prop
- Navigation: Hardcoded purple `rgba(45, 0, 247, 0.95)`
- Styled components: Hardcoded gradients and colors in `styled.tsx`
- Inline styles: `color: "white"`, `color: "var(--gray-11)"`

**Impact**: No single source of truth for colors. Changing theme requires hunting through dozens of files.

### 3. **Mixed Styling Approaches**

**Problem**: The codebase uses FOUR different styling systems simultaneously:

1. **Stitches** (`@stitches/react`) - Used in Navigation, PageContainer, styled.tsx
2. **Tailwind CSS** - Used in MovieCard, some UI components
3. **Radix UI Themes** - Used for Container, Grid, Button components
4. **Inline styles** - Used extensively throughout pages

**Impact**: Inconsistent styling, hard to maintain, difficult to apply global changes.

### 4. **Repeated Page Structure Pattern**

**Problem**: Every page follows the same structure but implements it differently:

```tsx
<PageContainer backgroundColor="..." nextPage="..." previousPage="...">
  <Container size="4" p="4">
    <Grid gap="6">
      {/* Header section - duplicated everywhere */}
      {/* Content section - varies */}
    </Grid>
  </Container>
</PageContainer>
```

**Impact**: Structural changes require updating every page component.

### 5. **Duplicate Loading/Error Handling**

**Problem**: Every page implements the same loading/error pattern:

```tsx
if (error) {
  showBoundary(error);
}
if (isLoading) {
  return <LoadingSpinner />;
}
if (!data?.length) {
  void navigate(NEXT_PAGE);
  return null;
}
```

**Impact**: Changes to loading/error UX require updating 20+ files.

### 6. **Hardcoded Typography**

**Problem**: Font sizes, weights, and line heights are hardcoded:

- `fontSize: "1.125rem"` (repeated 15+ times)
- `fontSize: "1.5rem"` (repeated 10+ times)
- `fontSize: "2rem"` (repeated 5+ times)
- `fontWeight: "bold"` (repeated 20+ times)

**Impact**: Typography changes require manual updates across many files.

### 7. **Navigation Colors Hardcoded**

**Problem**: Navigation component has hardcoded colors:

- Background: `rgba(45, 0, 247, 0.95)`
- Title: `#FFD700`
- Hover: `#FFD700`
- Overlay: `rgba(0, 0, 0, 0.5)`

**Impact**: Navigation styling is tightly coupled to specific color values.

### 8. **Page Background Colors Scattered**

**Problem**: Each page component passes a different `backgroundColor` to PageContainer:

- `/movies`: `var(--purple-8)`
- `/shows`: `var(--yellow-8)`
- `/audio`: `var(--red-8)`
- `/genres`: `var(--pink-8)`
- etc.

**Impact**: No centralized theme management. Changing page colors requires updating individual components.

## Recommended Refactoring Strategy

### Phase 1: Create Design System Foundation

#### 1.1 Centralize Colors

**Action**: Create a theme configuration file

**File**: `src/lib/theme.ts` or `src/theme/colors.ts`

```typescript
export const theme = {
  colors: {
    primary: {
      purple: "var(--purple-8)",
      yellow: "var(--yellow-8)",
      red: "var(--red-8)",
      // ... all colors
    },
    text: {
      primary: "white",
      secondary: "var(--gray-11)",
      muted: "rgba(255, 255, 255, 0.7)",
    },
    // ... semantic color tokens
  },
  // ... typography, spacing, etc.
};
```

**Benefits**:

- Single source of truth for colors
- Easy to swap entire color scheme
- Type-safe color usage

#### 1.2 Create Typography System

**Action**: Define typography scale

**File**: `src/theme/typography.ts`

```typescript
export const typography = {
  h1: { fontSize: "2rem", fontWeight: "bold", lineHeight: 1.2 },
  h2: { fontSize: "1.5rem", fontWeight: "bold", lineHeight: 1.3 },
  body: { fontSize: "1.125rem", lineHeight: 1.5 },
  caption: { fontSize: "0.875rem", lineHeight: 1.4 },
};
```

**Benefits**:

- Consistent typography
- Easy to adjust scale globally

### Phase 2: Create Reusable Components

#### 2.1 PageHeader Component

**Action**: Extract repeated header pattern

**File**: `src/components/PageHeader.tsx`

```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  variant?: "default" | "large";
}
```

**Usage**:

```tsx
<PageHeader
  title="You Watched 50 Movies"
  description="Your complete movie viewing history"
/>
```

**Benefits**:

- Single component to style
- Consistent header appearance
- Easy to add animations globally

#### 2.2 StandardPageLayout Component

**Action**: Extract common page structure

**File**: `src/components/StandardPageLayout.tsx`

```typescript
interface StandardPageLayoutProps {
  backgroundColor?: string;
  nextPage?: string;
  previousPage?: string;
  header: PageHeaderProps;
  children: ReactNode;
  loading?: boolean;
  error?: Error | null;
  emptyRedirect?: string;
}
```

**Benefits**:

- Consistent page structure
- Built-in loading/error handling
- Single place to update layout

#### 2.3 LoadingState Component

**Action**: Standardize loading states

**File**: `src/components/LoadingState.tsx`

**Benefits**:

- Consistent loading UX
- Easy to update loading design

#### 2.4 ErrorBoundary Wrapper

**Action**: Create HOC for error handling

**File**: `src/components/withErrorBoundary.tsx`

**Benefits**:

- DRY error handling
- Consistent error UX

### Phase 3: Standardize Styling Approach

#### 3.1 Choose Primary Styling System

**Recommendation**: Standardize on **Tailwind CSS** with CSS variables

**Rationale**:

- Already partially adopted (MovieCard uses it)
- Better performance than runtime CSS-in-JS
- Easier to theme with CSS variables
- Better developer experience

**Migration Strategy**:

1. Keep Radix UI components (they work with Tailwind)
2. Migrate Stitches components to Tailwind
3. Replace inline styles with Tailwind classes
4. Use CSS variables for theming

#### 3.2 Create Tailwind Theme Configuration

**Action**: Extend Tailwind config with design tokens

**File**: `tailwind.config.js` (extend existing)

```javascript
theme: {
  extend: {
    colors: {
      // Use CSS variables for easy theming
      page: {
        purple: 'var(--purple-8)',
        yellow: 'var(--yellow-8)',
        // ... all page colors
      },
      text: {
        primary: 'white',
        secondary: 'var(--gray-11)',
        // ...
      },
    },
    fontSize: {
      // Typography scale
    },
  },
}
```

**Benefits**:

- Type-safe Tailwind classes
- Easy to refactor colors
- Better IntelliSense

### Phase 4: Abstract Page-Specific Logic

#### 4.1 Create Page Configuration

**Action**: Define page metadata centrally

**File**: `src/lib/page-config.ts`

```typescript
export const pageConfig = {
  "/movies": {
    backgroundColor: "var(--purple-8)",
    nextPage: "/shows",
    previousPage: "/TopTen",
  },
  // ... all pages
};
```

**Benefits**:

- Centralized page routing/colors
- Easy to add new pages
- Single place to update navigation flow

#### 4.2 Create usePageConfig Hook

**Action**: Hook to get current page config

**File**: `src/hooks/usePageConfig.ts`

**Benefits**:

- Pages automatically get correct config
- Type-safe page navigation

### Phase 5: Refactor Specific Components

#### 5.1 Navigation Component

**Issues**:

- Hardcoded colors
- Stitches styling
- Inline styles

**Refactor**:

- Use Tailwind classes
- Use theme colors from config
- Extract styled components to separate file

#### 5.2 PageContainer Component

**Issues**:

- Inline styles
- Stitches for NavButtonContainer
- Hardcoded padding values

**Refactor**:

- Use Tailwind classes
- Extract navigation buttons to separate component
- Use theme spacing values

#### 5.3 MovieCard Component

**Status**: Already uses Tailwind (good!)

**Improvements**:

- Extract card variants
- Use theme colors
- Create Card component variants

## Implementation Priority

### High Priority (Do First)

1. ✅ Create PageHeader component
2. ✅ Create theme color configuration
3. ✅ Standardize on Tailwind CSS
4. ✅ Create StandardPageLayout component

### Medium Priority

5. ✅ Extract page configuration
6. ✅ Refactor Navigation component
7. ✅ Refactor PageContainer component
8. ✅ Create typography system

### Low Priority (Polish)

9. ✅ Standardize loading states
10. ✅ Create error boundary wrapper
11. ✅ Extract card variants
12. ✅ Add design tokens to Tailwind

## Expected Benefits

### Before Refactoring

- Changing header style: **15+ file edits**
- Changing color scheme: **50+ file edits**
- Adding new page: **Copy-paste entire component**
- Updating typography: **30+ file edits**

### After Refactoring

- Changing header style: **1 file edit** (PageHeader.tsx)
- Changing color scheme: **1 file edit** (theme config)
- Adding new page: **Use StandardPageLayout, minimal code**
- Updating typography: **1 file edit** (typography config)

## Migration Path

1. **Week 1**: Create theme system and PageHeader component
2. **Week 2**: Migrate 3-5 pages to use new components
3. **Week 3**: Migrate remaining pages
4. **Week 4**: Refactor Navigation and PageContainer
5. **Week 5**: Polish and remove old styling code

## Additional Recommendations

### 1. Create Storybook

- Document components
- Test different themes
- Show design system

### 2. Add Theme Switcher

- Dark/light mode
- Multiple color schemes
- Easy to test new designs

### 3. Extract Animation Variants

- Centralize framer-motion variants
- Consistent animations
- Easy to update timing

### 4. Create Component Library

- Reusable UI components
- Consistent API
- Better type safety

## Files to Create/Modify

### New Files

- `src/lib/theme.ts` - Theme configuration
- `src/lib/typography.ts` - Typography system
- `src/lib/page-config.ts` - Page configuration
- `src/components/PageHeader.tsx` - Reusable header
- `src/components/StandardPageLayout.tsx` - Page layout wrapper
- `src/components/LoadingState.tsx` - Loading component
- `src/hooks/usePageConfig.ts` - Page config hook
- `src/theme/colors.ts` - Color tokens (if separate)

### Files to Refactor

- All `src/components/pages/*.tsx` - Use new components
- `src/components/Navigation.tsx` - Migrate to Tailwind
- `src/components/PageContainer.tsx` - Use Tailwind
- `src/components/ui/styled.tsx` - Migrate to Tailwind or remove
- `tailwind.config.js` - Extend with theme tokens

## Conclusion

The current codebase has significant opportunities for DRY improvements. By creating a design system foundation, reusable components, and standardizing on Tailwind CSS, we can reduce code duplication by ~60% and make style overhauls dramatically easier. The refactoring can be done incrementally without breaking existing functionality.
