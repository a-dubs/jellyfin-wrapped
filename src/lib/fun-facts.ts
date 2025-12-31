import { ChapterData } from "@/hooks/story/useChapterData";

export interface FunFact {
  emoji: string;
  title: string;
  value: string;
  comparison?: string;
}

const genreEmojis: Record<string, string> = {
  "Sci-Fi": "🚀",
  "Science Fiction": "🚀",
  Drama: "🎭",
  Comedy: "😂",
  Action: "💥",
  Horror: "👻",
  Documentary: "📚",
  Animation: "🎨",
  Romance: "💕",
  Thriller: "🔪",
  Mystery: "🔍",
  Fantasy: "✨",
};

const genreComparisons: Record<string, string> = {
  "Sci-Fi": "Enough to staff a space station",
  "Science Fiction": "Enough to staff a space station",
  Drama: "You've felt ALL the feels",
  Comedy: "That's a lot of laughs",
  Action: "Your adrenaline must be through the roof",
  Horror: "You're braver than most",
  Documentary: "You're basically a walking encyclopedia",
  Animation: "Your inner child is thriving",
  Romance: "You're a hopeless romantic",
  Thriller: "You love the suspense",
  Mystery: "You're a detective at heart",
  Fantasy: "You've explored countless realms",
};

/**
 * Generate fun facts from chapter data
 * Based on UI_UX_OVERHAUL.md Appendix J.7.3
 */
export function generateFunFacts(data: ChapterData): FunFact[] {
  const facts: FunFact[] = [];
  const totalHours = Math.round(data.totalMinutes / 60);

  // Century Club
  if (totalHours > 100) {
    facts.push({
      emoji: "🏆",
      title: "Century Club",
      value: `${totalHours}+ hours watched`,
      comparison: "That's more than most people watch in a year!",
    });
  }

  // Genre-specific
  if (data.topGenre) {
    const genreCount = data.topGenre.count;
    const emoji = genreEmojis[data.topGenre.name] ?? "🎬";
    const comparison =
      genreComparisons[data.topGenre.name] ?? "You're a true fan";
    facts.push({
      emoji,
      title: `${data.topGenre.name} Superfan`,
      value: `${genreCount} ${genreCount === 1 ? "title" : "titles"}`,
      comparison,
    });
  }

  // Unfinished shows
  if (data.unfinishedShows.length > 0) {
    facts.push({
      emoji: "📺",
      title: "Cliffhanger Collector",
      value: `${data.unfinishedShows.length} ${data.unfinishedShows.length === 1 ? "show" : "shows"} unfinished`,
      comparison: "Time to tie up loose ends?",
    });
  }

  // Total titles watched
  const totalTitles = data.movies.length + data.shows.length;
  if (totalTitles > 50) {
    facts.push({
      emoji: "🎬",
      title: "Content Connoisseur",
      value: `${totalTitles} ${totalTitles === 1 ? "title" : "titles"} watched`,
      comparison: "You're running your own film festival",
    });
  }

  // Critically acclaimed
  if (data.criticallyAcclaimed.length > 0) {
    const topRating = Math.max(
      ...data.criticallyAcclaimed.map((item) => item.item.communityRating ?? 0)
    );
    if (topRating >= 8) {
      facts.push({
        emoji: "⭐",
        title: "Taste Maker",
        value: `${topRating.toFixed(1)}/10 average rating`,
        comparison: "You have excellent taste",
      });
    }
  }

  // Oldest content
  if (data.oldestMovie || data.oldestShow) {
    const oldestYear = Math.min(
      data.oldestMovie?.date
        ? new Date(data.oldestMovie.date).getFullYear()
        : Infinity,
      data.oldestShow?.date
        ? new Date(data.oldestShow.date).getFullYear()
        : Infinity
    );
    if (oldestYear < 2000) {
      facts.push({
        emoji: "🎞️",
        title: "Classic Collector",
        value: `Watched content from ${oldestYear}`,
        comparison: "You appreciate the classics",
      });
    }
  }

  // Return max 5 facts, minimum 2 required
  return facts.slice(0, 5);
}
