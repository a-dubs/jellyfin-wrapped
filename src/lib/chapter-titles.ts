/**
 * Chapter titles for share functionality
 */
export const CHAPTER_TITLES: Record<string, string> = {
  intro: "Intro",
  "big-number": "The Big Number",
  "top-ten": "Your Top 10",
  genres: "Your Genres",
  habits: "Viewing Habits",
  "deep-cuts": "Deep Cuts",
  journey: "The Journey",
  "fun-facts": "Fun Facts",
  finale: "The Finale",
};

/**
 * Get chapter title by chapter ID
 */
export function getChapterTitle(chapterId: string): string {
  // Remove "chapter-" prefix if present
  const id = chapterId.replace(/^chapter-/, "");
  return CHAPTER_TITLES[id] || "Chapter";
}
