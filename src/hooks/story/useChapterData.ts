import { useMemo } from "react";
import { useTopTen } from "../queries/useTopTen";
import { useMovies } from "../queries/useMovies";
import { useShows } from "../queries/useShows";

export interface ChapterData {
  totalMinutes: number;
  isLoading: boolean;
  hasError: boolean;
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
  const { isLoading: moviesLoading, error: moviesError } = useMovies();
  const { isLoading: showsLoading, error: showsError } = useShows();

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

  const isLoading = topTenLoading || moviesLoading || showsLoading;
  const hasError =
    (topTenError !== null && topTenError !== undefined) ||
    (moviesError !== null && moviesError !== undefined) ||
    (showsError !== null && showsError !== undefined);

  return {
    totalMinutes,
    isLoading,
    hasError,
  };
}
