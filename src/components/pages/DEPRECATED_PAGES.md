# Deprecated Pages

**⚠️ These pages are deprecated and will be removed in v2.1**

These page components are kept for reference but are no longer routed. All old routes redirect to the new story mode experience at `/story`.

## Deprecated Pages

- `MoviesReviewPage.tsx` → Redirects to `/story/top-ten`
- `ShowReviewPage.tsx` → Redirects to `/story/top-ten`
- `TopTenPage.tsx` → Redirects to `/story/top-ten`
- `GenreReviewPage.tsx` → Redirects to `/story/genres`
- `FavoriteActorsPage.tsx` → Redirects to `/story/top-ten`
- `PunchCardPage.tsx` → Redirects to `/story/habits`
- `DeviceStatsPage.tsx` → Redirects to `/story/habits`
- `OldestMoviePage.tsx` → Redirects to `/story/deep-cuts`
- `OldestShowPage.tsx` → Redirects to `/story/deep-cuts`
- `CriticallyAcclaimedPage.tsx` → Redirects to `/story/deep-cuts`
- `ShowOfTheMonthPage.tsx` → Redirects to `/story/journey`
- `ActivityCalendarPage.tsx` → Redirects to `/story/journey`
- `UnfinishedShowsPage.tsx` → Redirects to `/story/fun-facts`
- `AudioReviewPage.tsx` → Redirects to `/story/fun-facts`
- `MusicVideoPage.tsx` → Redirects to `/story/fun-facts`
- `LiveTvReviewPage.tsx` → Redirects to `/story/fun-facts`
- `MinutesPlayedPerDayPage.tsx` → Redirects to `/story/habits`
- `HolidayReviewPage.tsx` → Redirects to `/story`

## Migration Notes

- All functionality has been integrated into the new story mode chapters
- Old routes are handled by `LegacyRedirect` component in `App.tsx`
- URL parameters are preserved during redirects
- Bookmarks to old routes will continue to work via redirects

## Removal Plan

These files will be deleted in v2.1 after ensuring all users have migrated to the new story mode experience.
