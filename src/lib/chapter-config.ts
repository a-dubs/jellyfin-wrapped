import { ChapterData } from "@/hooks/story/useChapterData";

export interface ChapterConfig {
  id: string;
  number: number;
  /** Check if this chapter should be shown based on data */
  shouldShow: (data: ChapterData) => boolean;
}

/**
 * Chapter configuration defining which chapters exist and their data requirements
 * Based on UI_UX_OVERHAUL.md Appendix J.2.1
 */
export const CHAPTER_CONFIGS: ChapterConfig[] = [
  {
    id: "intro",
    number: 1,
    shouldShow: () => true, // Always show
  },
  {
    id: "big-number",
    number: 2,
    shouldShow: (data) => data.totalMinutes > 0,
  },
  {
    id: "top-ten",
    number: 3,
    shouldShow: (data) => data.hasMovies || data.hasShows,
  },
  {
    id: "genres",
    number: 4,
    shouldShow: (data) => data.hasGenres,
  },
  // Future chapters (not yet implemented):
  // {
  //   id: "habits",
  //   number: 5,
  //   shouldShow: (data) => data.heatmap.length > 0,
  // },
  // {
  //   id: "deep-cuts",
  //   number: 6,
  //   shouldShow: (data) =>
  //     data.oldestMovie ||
  //     data.oldestShow ||
  //     data.criticallyAcclaimed.length > 0,
  // },
  // {
  //   id: "journey",
  //   number: 7,
  //   shouldShow: (data) => data.monthlyStats.length > 0,
  // },
  // {
  //   id: "fun-facts",
  //   number: 8,
  //   shouldShow: (data) => data.facts.length >= 2,
  // },
  // {
  //   id: "finale",
  //   number: 9,
  //   shouldShow: () => true, // Always show
  // },
];

/**
 * Get active chapters based on data availability
 */
export function getActiveChapters(data: ChapterData): ChapterConfig[] {
  return CHAPTER_CONFIGS.filter((chapter) => chapter.shouldShow(data));
}

/**
 * Get chapter number for a given chapter ID, accounting for skipped chapters
 */
export function getChapterDisplayNumber(
  chapterId: string,
  activeChapters: ChapterConfig[]
): number {
  const index = activeChapters.findIndex((c) => c.id === chapterId);
  return index >= 0 ? index + 1 : 0;
}
