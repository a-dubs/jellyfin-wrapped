# Section Reorganization & Empty Data Handling

## Current Problem Analysis

### Issue 1: Empty Sections Not Skipped Properly

**Current State**: Some pages navigate away if empty, but inconsistently:

- ✅ MoviesReviewPage: Navigates if empty
- ✅ ShowReviewPage: Navigates if empty
- ✅ AudioReviewPage: Navigates if empty
- ✅ GenreReviewPage: Navigates if empty
- ✅ HolidayReviewPage: Navigates if empty
- ✅ OldestMoviePage: Navigates if empty
- ✅ OldestShowPage: Navigates if empty
- ✅ ShowOfTheMonthPage: Navigates if empty
- ✅ UnfinishedShowsPage: Navigates if empty

**Problem**: The navigation happens AFTER rendering, causing flash of empty content. Also, the navigation chain breaks if one section is empty.

**Solution**: Create a centralized page flow system that pre-filters empty sections before rendering.

### Issue 2: Too Many Sections (17 total!)

**Current Sections**:

1. TopTen (Movies + Shows)
2. Movies
3. Shows
4. Audio
5. Music Videos
6. Actors
7. Genres
8. Live TV
9. Critically Acclaimed
10. Oldest Movie
11. Oldest Show
12. **Holidays** ⚠️ (User says this is ridiculous)
13. Minutes Per Day
14. Show of the Month
15. Unfinished Shows
16. Device Stats
17. Activity Calendar (Punch Card)

**Comparison**: Spotify Wrapped typically has 8-12 slides total, grouped into logical sections.

## Proposed Reorganization

### Group 1: Top Content (Core Stats)

**Combine into single "Top Content" page:**

- ✅ Top 10 Movies & Shows (keep as is)
- ✅ Top Genre (move here from separate page)
- ✅ Favorite Actors (move here from separate page)

**Result**: 3 sections → 1 page with multiple subsections

### Group 2: Content Library (What You Watched)

**Keep separate but make skippable:**

- ✅ Movies (if empty, skip)
- ✅ Shows (if empty, skip)
- ✅ Audio (if empty, skip)
- ✅ Music Videos (if empty, skip)
- ✅ Live TV (if empty, skip)

**Result**: 5 sections, but only show if data exists

### Group 3: Insights & Patterns (Analytics)

**Combine into "Your Viewing Insights" page:**

- ✅ Minutes Per Day (time patterns)
- ✅ Activity Calendar (when you watch)
- ✅ Device Stats (how you watch)
- ✅ Show of the Month (monthly breakdown)

**Result**: 4 sections → 1 page with multiple insights

### Group 4: Special Content (Fun Facts)

**Combine into "Special Moments" page:**

- ✅ Critically Acclaimed (high-rated content)
- ✅ Oldest Movie & Show (vintage content - combine into one section)
- ❌ **Holidays** (REMOVE - user says it's ridiculous)

**Result**: 3 sections → 1 page, remove holidays

### Group 5: Unfinished Content

**Keep separate:**

- ✅ Unfinished Shows (useful for users)

**Result**: 1 section

## Final Structure (8-10 pages total)

1. **Top Content** (Top 10, Genre, Actors)
2. **Movies** (if data exists)
3. **Shows** (if data exists)
4. **Audio** (if data exists)
5. **Music Videos** (if data exists)
6. **Live TV** (if data exists)
7. **Viewing Insights** (Minutes, Calendar, Devices, Monthly)
8. **Special Moments** (Critically Acclaimed, Oldest Content)
9. **Unfinished Shows** (if data exists)

**Reduction**: 17 sections → 9 pages (47% reduction)

## Implementation Plan

### Phase 1: Fix Empty Section Skipping

Create a page flow manager that:

1. Checks all sections for data availability
2. Builds a dynamic navigation chain
3. Only includes pages with data
4. Handles navigation automatically

### Phase 2: Group Related Sections

1. Create "TopContentPage" combining Top 10, Genre, Actors
2. Create "ViewingInsightsPage" combining analytics
3. Create "SpecialMomentsPage" combining special content
4. Remove HolidayReviewPage

### Phase 3: Update Navigation

Update navigation to reflect new structure and make it dynamic based on available data.

## Code Changes Needed

### 1. Create Page Flow Manager

```typescript
// src/lib/page-flow.ts
export interface PageConfig {
  path: string;
  name: string;
  hasData: () => Promise<boolean> | boolean;
  component: React.ComponentType;
}

export const pageFlow: PageConfig[] = [
  {
    path: "/top-content",
    name: "Top Content",
    hasData: async () => {
      // Check if top 10, genre, or actors have data
      return true; // Always show
    },
    component: TopContentPage,
  },
  {
    path: "/movies",
    name: "Movies",
    hasData: async () => {
      const movies = await fetchMovies();
      return movies && movies.length > 0;
    },
    component: MoviesReviewPage,
  },
  // ... etc
];
```

### 2. Create Dynamic Navigation Component

```typescript
// src/components/DynamicPageFlow.tsx
export function DynamicPageFlow() {
  const [availablePages, setAvailablePages] = useState<PageConfig[]>([]);

  useEffect(() => {
    // Filter pages that have data
    const filterPages = async () => {
      const pagesWithData = await Promise.all(
        pageFlow.map(async (page) => ({
          ...page,
          available: await page.hasData(),
        }))
      );
      setAvailablePages(pagesWithData.filter((p) => p.available));
    };
    filterPages();
  }, []);

  // Build navigation chain dynamically
}
```

### 3. Combine Pages

**TopContentPage.tsx**:

- Top 10 Movies & Shows (existing TopTen)
- Top Genre (from GenreReviewPage)
- Favorite Actors (from FavoriteActorsPage)

**ViewingInsightsPage.tsx**:

- Minutes Per Day
- Activity Calendar
- Device Stats
- Show of the Month

**SpecialMomentsPage.tsx**:

- Critically Acclaimed
- Oldest Movie & Show (combined)

## Benefits

1. **Better UX**: No empty sections, smoother flow
2. **Fewer Pages**: 17 → 9 pages (47% reduction)
3. **Logical Grouping**: Related content together
4. **Easier Navigation**: Clearer structure
5. **Removed Fluff**: No more holiday watching section

## Migration Strategy

1. **Week 1**: Implement page flow manager and empty data detection
2. **Week 2**: Create combined pages (TopContent, ViewingInsights, SpecialMoments)
3. **Week 3**: Update navigation and routing
4. **Week 4**: Remove old individual pages and holiday page
5. **Week 5**: Test and polish
