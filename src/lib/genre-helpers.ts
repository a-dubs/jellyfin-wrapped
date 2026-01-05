import { SimpleItemDto } from "./queries/types";

export interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

// Color palette for genres
export const genreColors = [
  "#FFD93D", // Gold
  "#FF6B6B", // Coral
  "#4ECDC4", // Cyan
  "#C44CFF", // Magenta
  "#6C63FF", // Electric
  "#FF9F66", // Orange
  "#95E1D3", // Mint
  "#F38181", // Pink
];

export const genreIcons: Record<string, string> = {
  "Sci-Fi": "🚀",
  "Science Fiction": "🚀",
  Drama: "🎭",
  Comedy: "😂",
  Action: "💥",
  Horror: "👻",
  Thriller: "🔪",
  Romance: "💕",
  Documentary: "📹",
  Animation: "🎨",
  Fantasy: "✨",
  Mystery: "🔍",
};

// Helper function to get genre icon
export function getGenreIcon(genreName: string): string {
  return genreIcons[genreName] || "📺";
}

// Helper function to prepare genre data
export function prepareGenreData(
  genreCounts: Map<string, number>,
  totalItems: number
): GenreData[] {
  const sortedGenres = Array.from(genreCounts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / totalItems) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 genres

  return sortedGenres.map((genre, index) => ({
    ...genre,
    color: genreColors[index % genreColors.length],
    icon: getGenreIcon(genre.name),
  }));
}

export function getTopGenre(
  movies: SimpleItemDto[],
  shows: SimpleItemDto[]
): {
  genre: string;
  items: SimpleItemDto[];
  count: number;
  honorableMentions: { genre: string; count: number }[];
} | null {
  const genreCounts = new Map<string, SimpleItemDto[]>();

  [...movies, ...shows].forEach((item: SimpleItemDto) => {
    item.genres?.forEach((genre: string) => {
      const existing = genreCounts.get(genre) || [];
      genreCounts.set(genre, [...existing, item]);
    });
  });

  // Sort genres by count
  const sortedGenres = Array.from(genreCounts.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );

  if (sortedGenres.length === 0) return null;

  const [topGenre, topItems] = sortedGenres[0];
  const honorableMentions = sortedGenres.slice(1, 4).map(([genre, items]) => ({
    genre,
    count: items.length,
  }));

  return {
    genre: topGenre,
    items: topItems,
    count: topItems.length,
    honorableMentions,
  };
}
