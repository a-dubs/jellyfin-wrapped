import { useMemo } from "react";
import { useTopTen } from "../queries/useTopTen";
import { useMovies } from "../queries/useMovies";
import { useShows } from "../queries/useShows";

export interface ChapterData {
  totalMinutes: number;
  isLoading: boolean;
  hasError: boolean;
  // Data for chapter filtering
  movies: Array<{ id?: string; name?: string; genres?: string[] }>;
  shows: Array<{ id?: string; name?: string; genres?: string[] }>;
  genres: Array<{ name: string; count: number }>;
  hasMovies: boolean;
  hasShows: boolean;
  hasGenres: boolean;
}

/**
 * Aggregates data needed for all story chapters
 */
export function useChapterData(): ChapterData {
  const {
    data: topTenData,
    isLoading: topTenLoading,
    error: topTenError,
  } = useTopTen();
  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useMovies();
  const {
    data: shows,
    isLoading: showsLoading,
    error: showsError,
  } = useShows();

  const totalMinutes = useMemo(() => {
    if (!topTenData) return 0;

    // Calculate total minutes from movies
    const movieMinutes =
      topTenData.movies.reduce(
        (acc, movie) => acc + (movie.durationSeconds ?? 0) / 60,
        0
      ) || 0;

    // Calculate total minutes from shows
    const showMinutes =
      topTenData.shows.reduce((acc, show) => acc + show.playbackTime / 60, 0) ||
      0;

    return movieMinutes + showMinutes;
  }, [topTenData]);

  const genres = useMemo(() => {
    if (!movies || !shows) return [];

    const allItems = [...movies, ...shows.map((show) => show.item)];

    const genreCounts = new Map<string, number>();
    allItems.forEach((item) => {
      item.genres?.forEach((genre: string) => {
        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      });
    });

    return Array.from(genreCounts.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [movies, shows]);

  const isLoading = topTenLoading || moviesLoading || showsLoading;
  const hasError =
    (topTenError !== null && topTenError !== undefined) ||
    (moviesError !== null && moviesError !== undefined) ||
    (showsError !== null && showsError !== undefined);

  return {
    totalMinutes,
    isLoading,
    hasError,
    movies: movies || [],
    shows: shows?.map((s) => s.item) || [],
    genres,
    hasMovies: (movies?.length ?? 0) > 0,
    hasShows: (shows?.length ?? 0) > 0,
    hasGenres: genres.length > 0,
  };
}
