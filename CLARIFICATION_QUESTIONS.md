# Clarification Questions for UI/UX Overhaul Implementation

## User Flow & Navigation

### 1. Landing Page → Login → Story Mode Flow

**Question:** The document maps `SplashPage` → **1. INTRO** and `LoadingDataPage` → **1. INTRO (loading state)**, but doesn't clearly specify the complete user journey.

**Specific questions:**

- Should `SplashPage` (`/`) redirect directly to `/story`, or remain as a separate landing page that links to `/configure`?
- After successful login in `ServerConfigurationPage`, should it redirect to `/story` instead of `/loading`?
- Should the old `/loading` → `/movies` flow be completely replaced, or kept as a fallback option?

### 2. IntroChapter Loading State Integration

**Question:** The document says `LoadingDataPage` should become "INTRO (loading state)" but doesn't specify the implementation details.

**Specific questions:**

- Should `IntroChapter` automatically show a loading state when `useChapterData` is fetching?
- Should the "REVEAL YOUR YEAR" button only appear after all data is loaded?
- Should the loading state use the cinematic "film countdown" design mentioned in Appendix H, or a simpler loading indicator?
- What happens if data loading fails - show error state in IntroChapter or redirect elsewhere?

### 3. ServerConfigurationPage Integration

**Question:** Appendix B says `ServerConfigurationPage` should be "styled to match" but doesn't specify routing behavior.

**Specific questions:**

- Should `ServerConfigurationPage` use the new Midnight Premiere design system?
- After successful authentication, should it redirect to `/story` instead of `/loading`?
- Should it remain accessible via navigation, or only accessible before first login?

## Chapter Behavior & Data Handling

### 4. Chapter Skipping Logic

**Question:** Appendix H mentions "Skip chapter entirely if no relevant data" but doesn't specify the logic.

**Specific questions:**

- Should chapters be automatically skipped if they have no data, or should they show an empty state?
- How should the progress indicator (dots) handle skipped chapters - show fewer dots or keep numbering?
- Should users be able to manually skip chapters, or is it automatic only?

### 5. Empty State Handling

**Question:** Appendix H mentions graceful handling but doesn't specify the UX.

**Specific questions:**

- Should empty chapters show a message like "Not enough data for this section" or be completely hidden?
- Should empty states use the same cinematic styling or be more subtle?
- If a user has no viewing data at all, should they see a special "Get Started" chapter instead?

### 6. Error State Behavior

**Question:** Appendix H mentions error slides but doesn't specify flow behavior.

**Specific questions:**

- If a chapter fails to load data, should the story continue to the next chapter or pause?
- Should error states allow retry, or just show a message and continue?
- Should errors break the entire story mode, or be chapter-specific?

## Timeframe Selection

### 7. Timeframe Selector Placement

**Question:** Current `SplashPage` has a `TimeframeSelector`, but the document doesn't mention where it should be in story mode.

**Specific questions:**

- Should timeframe selection happen before entering story mode (on SplashPage/ServerConfigurationPage)?
- Should it be accessible during story mode (e.g., via a settings icon)?
- Should changing timeframe restart the story from the beginning, or update data in place?

### 8. Timeframe Persistence

**Specific questions:**

- Should the selected timeframe persist across sessions?
- Should it be stored in localStorage or URL params?
- How should timeframe changes affect cached React Query data?

## Old Pages & Backward Compatibility

### 9. Old Page Deprecation Strategy

**Question:** Appendix B lists pages to REMOVE but doesn't specify the migration strategy.

**Specific questions:**

- Should old pages (`MoviesReviewPage`, `ShowReviewPage`, etc.) be completely removed, or kept as fallback routes?
- Should there be a way to access the old "dashboard" view for power users?
- Should old routes redirect to story mode, or return 404?

### 10. Navigation Component

**Question:** The document mentions removing the hamburger menu but doesn't specify replacement.

**Specific questions:**

- Should navigation be completely removed in story mode (already implemented)?
- Should there be a way to exit story mode and return to a dashboard view?
- Should the old navigation menu be kept for non-story routes, or completely redesigned?

## Share Functionality

### 11. Share Card Implementation

**Question:** Chapter 9 (THE FINALE) mentions shareable cards but doesn't specify details.

**Specific questions:**

- Should sharing be available only at the Finale chapter, or throughout the story?
- Should users be able to share individual chapters (e.g., "My Top 10") or only the full summary?
- What sharing methods should be supported (download image, copy link, social media)?
- Should share cards include the Jellyfin Wrapped branding, or be customizable?

### 12. Share Card Data

**Specific questions:**

- What data should be included on the share card (total hours, top genre, top show/movie, percentile)?
- How should percentile be calculated - against all users or just this server?
- Should share cards be generated client-side or server-side?

## Animation & Interaction Details

### 13. Page Transition Timing

**Question:** Appendix I specifies timing but doesn't address user control.

**Specific questions:**

- Should users be able to skip animations (e.g., click to advance immediately)?
- Should there be a "skip intro" option for repeat visitors?
- How should auto-advance work, if at all (e.g., auto-advance after 5 seconds)?

### 14. Swipe Gesture Sensitivity

**Question:** Mobile gestures are mentioned but sensitivity isn't specified.

**Specific questions:**

- What should be the minimum swipe distance (currently 50px)?
- Should swipe sensitivity be adjustable?
- How should horizontal swipes within chapters (e.g., Top 10 carousel) be distinguished from vertical chapter navigation?

### 15. Keyboard Navigation Escape

**Question:** Appendix F mentions Escape key but doesn't specify behavior.

**Specific questions:**

- Should Escape exit story mode completely, or just show a menu?
- Should there be a confirmation dialog before exiting?
- Where should Escape navigate to - SplashPage, ServerConfigurationPage, or a dashboard?

## Data Requirements & Calculations

### 16. Total Watch Time Calculation

**Question:** Chapter 2 (BIG NUMBER) needs total watch time but source isn't fully specified.

**Specific questions:**

- Should total watch time include all content types (movies, shows, audio, Live TV)?
- Should it be calculated from `useTopTen` data or a separate aggregate query?
- How should partial watches be handled (e.g., watched 50% of a movie)?

### 17. Percentile Calculation

**Question:** Chapter 9 mentions percentile but calculation method isn't specified.

**Specific questions:**

- Should percentile be calculated against all Jellyfin Wrapped users globally, or just users on the same server?
- Is percentile calculation feasible without a backend service to aggregate user data?
- Should this feature be optional/placeholder if global data isn't available?

### 18. Fun Facts Data Sources

**Question:** Chapter 8 (FUN FACTS) mentions derived data but doesn't specify all sources.

**Specific questions:**

- What specific fun facts should be included (examples given but not exhaustive)?
- How should "longest binge" be calculated - consecutive hours or single session?
- Should fun facts be generated dynamically or use predefined templates?
- How many fun facts should be shown per chapter?

## Visual Design Details

### 19. Background Variants Per Chapter

**Question:** StorySlide supports background variants but assignment isn't specified.

**Specific questions:**

- Which background variant should each chapter use (void, aurora, gradient-gold, gradient-hero)?
- Should backgrounds be chapter-specific or user-configurable?
- Should backgrounds animate/transition between chapters?

### 20. Accent Colors Per Chapter

**Question:** Per-section accent colors are listed but chapter mapping isn't clear.

**Specific questions:**

- Should each chapter use a different accent color, or can they repeat?
- Should accent colors match the content (e.g., gold for Top 10, cyan for Genres)?
- How should accent colors affect the overall visual flow?

### 21. Typography Responsiveness

**Question:** Type scale uses clamp() but breakpoint behavior isn't fully specified.

**Specific questions:**

- Should typography scale differently on mobile vs desktop?
- Are the clamp() values optimal for all screen sizes (phones, tablets, desktops, ultrawide)?
- Should there be a maximum font size cap for very large screens?

## Performance & Optimization

### 22. Data Preloading Strategy

**Question:** Story mode needs data for multiple chapters but loading strategy isn't specified.

**Specific questions:**

- Should all data be preloaded before story mode starts, or loaded on-demand per chapter?
- Should React Query cache be used to prevent re-fetching?
- How should loading states be handled if data isn't ready when a chapter becomes active?

### 23. Image Loading Strategy

**Question:** Chapters show posters/images but loading strategy isn't specified.

**Specific questions:**

- Should poster images be preloaded for smooth transitions?
- How should missing poster images be handled (placeholder, skip item)?
- Should images use lazy loading or eager loading?

## Accessibility & Edge Cases

### 24. Reduced Motion Support

**Question:** Appendix F mentions prefers-reduced-motion but implementation details are minimal.

**Specific questions:**

- Should all animations be disabled, or just reduced?
- Should reduced motion mode still show transitions but faster/simpler?
- How should confetti and particle effects be handled in reduced motion mode?

### 25. Screen Reader Experience

**Question:** Screen reader support is mentioned but full experience isn't specified.

**Specific questions:**

- Should screen reader users get a different, more linear experience?
- How should animated number reveals be announced?
- Should there be a "text-only" mode for accessibility?

### 26. Very Small/Large Data Sets

**Question:** Edge cases for data volume aren't addressed.

**Specific questions:**

- How should the story handle users with very little viewing data (e.g., < 10 hours)?
- How should it handle users with massive amounts of data (e.g., > 10,000 hours)?
- Should there be different story lengths based on data availability?

## Implementation Priority

### 27. Phase Implementation Order

**Question:** Roadmap shows phases but doesn't specify if old pages should be removed incrementally.

**Specific questions:**

- Should old pages be removed as new chapters are implemented, or all at once?
- Should there be a feature flag to toggle between old and new experiences?
- Should the old navigation menu be updated incrementally or replaced entirely?

### 28. Backward Compatibility

**Specific questions:**

- Should bookmarks to old routes (e.g., `/movies`) redirect to story mode?
- Should URL parameters be preserved/translated?
- How should users who have the old experience bookmarked be handled?

---

## Summary of Critical Questions

**Most Critical (Blocking Implementation):**

1. **User Flow:** SplashPage → Configure → Story Mode routing
2. **Loading State:** How IntroChapter handles data loading
3. **Chapter Skipping:** Logic for handling empty/missing data
4. **Old Pages:** Whether to remove or keep as fallback

**Important (Affects UX):** 5. Timeframe selector placement and behavior 6. Share functionality implementation details 7. Error state handling and recovery 8. Animation skip/control options

**Nice to Have (Can be refined later):** 9. Percentile calculation method 10. Background/accent color assignments 11. Performance optimization strategies 12. Accessibility enhancements
