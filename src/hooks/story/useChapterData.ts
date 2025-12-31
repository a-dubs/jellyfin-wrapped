import { useMemo } from "react";
import { useTopTen } from "../queries/useTopTen";
import { useMovies } from "../queries/useMovies";
import { useShows } from "../queries/useShows";
import { usePunchCard } from "../queries/usePunchCard";
import { useDeviceStats } from "../queries/useDeviceStats";
import { useMonthlyShowStats } from "../queries/useMonthlyShowStats";
import { useCalendar } from "../queries/useCalendar";
import { useUnfinishedShows } from "../queries/useUnfinishedShows";
import { getTopRatedContent } from "@/lib/rating-helpers";
import { SimpleItemDto } from "@/lib/queries/types";

export interface ChapterData {
  totalMinutes: number;
  isLoading: boolean;
  hasError: boolean;
  // Data for chapter filtering
  movies: SimpleItemDto[];
  shows: SimpleItemDto[];
  genres: Array<{ name: string; count: number }>;
  hasMovies: boolean;
  hasShows: boolean;
  hasGenres: boolean;
  // Phase 3 data
  punchCardData: Array<{ dayOfWeek: number; hour: number; count: number }>;
  deviceStats: {
    deviceUsage: Array<{ deviceName: string; minutes: number }>;
    browserUsage: Array<{ browserName: string; minutes: number }>;
    osUsage: Array<{ osName: string; minutes: number }>;
  } | null;
  monthlyStats: Array<{
    month: Date;
    topShow: { item: SimpleItemDto; watchTimeMinutes: number };
    totalWatchTimeMinutes: number;
  }>;
  calendarData: Array<{ value: number; day: string }>;
  unfinishedShows: Array<{ item: SimpleItemDto }>;
  oldestMovie: SimpleItemDto | null;
  oldestShow: SimpleItemDto | null;
  criticallyAcclaimed: Array<{ item: SimpleItemDto; type: "movie" | "show" }>;
  topGenre: { name: string; count: number } | null;
  topShow: SimpleItemDto | null;
  topMovie: SimpleItemDto | null;
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
  const {
    data: punchCardData,
    isLoading: punchCardLoading,
    error: punchCardError,
  } = usePunchCard();
  const {
    data: deviceStats,
    isLoading: deviceStatsLoading,
    error: deviceStatsError,
  } = useDeviceStats();
  const {
    data: monthlyStats,
    isLoading: monthlyStatsLoading,
    error: monthlyStatsError,
  } = useMonthlyShowStats();
  const {
    data: calendarData,
    isLoading: calendarLoading,
    error: calendarError,
  } = useCalendar();
  const {
    data: unfinishedShows,
    isLoading: unfinishedLoading,
    error: unfinishedError,
  } = useUnfinishedShows();

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

  // Calculate oldest movie and show
  const oldestMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    const sorted = [...movies].sort((a, b) => {
      const aDate = new Date(a.date ?? new Date());
      const bDate = new Date(b.date ?? new Date());
      return aDate.getTime() - bDate.getTime();
    });
    return sorted[0] ?? null;
  }, [movies]);

  const oldestShow = useMemo(() => {
    if (!shows || shows.length === 0) return null;
    const showItems = shows.map((s) => s.item);
    const sorted = [...showItems].sort((a, b) => {
      const aDate = new Date(a.date ?? new Date());
      const bDate = new Date(b.date ?? new Date());
      return aDate.getTime() - bDate.getTime();
    });
    return sorted[0] ?? null;
  }, [shows]);

  // Get critically acclaimed content
  const criticallyAcclaimed = useMemo(() => {
    if (!movies || !shows) return [];
    return getTopRatedContent(movies, shows);
  }, [movies, shows]);

  // Get top genre
  const topGenre = useMemo(() => {
    if (genres.length === 0) return null;
    return genres[0] ?? null;
  }, [genres]);

  // Get top show and movie from top ten
  const topShow = useMemo(() => {
    if (!topTenData || topTenData.shows.length === 0) return null;
    return topTenData.shows[0]?.item ?? null;
  }, [topTenData]);

  const topMovie = useMemo(() => {
    if (!topTenData || topTenData.movies.length === 0) return null;
    return topTenData.movies[0] ?? null;
  }, [topTenData]);

  const isLoading =
    topTenLoading ||
    moviesLoading ||
    showsLoading ||
    punchCardLoading ||
    deviceStatsLoading ||
    monthlyStatsLoading ||
    calendarLoading ||
    unfinishedLoading;

  const hasError =
    (topTenError !== null && topTenError !== undefined) ||
    (moviesError !== null && moviesError !== undefined) ||
    (showsError !== null && showsError !== undefined) ||
    (punchCardError !== null && punchCardError !== undefined) ||
    (deviceStatsError !== null && deviceStatsError !== undefined) ||
    (monthlyStatsError !== null && monthlyStatsError !== undefined) ||
    (calendarError !== null && calendarError !== undefined) ||
    (unfinishedError !== null && unfinishedError !== undefined);

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
    // Phase 3 data
    punchCardData: punchCardData || [],
    deviceStats: deviceStats ?? null,
    monthlyStats: monthlyStats || [],
    calendarData: calendarData || [],
    unfinishedShows: unfinishedShows || [],
    oldestMovie,
    oldestShow,
    criticallyAcclaimed,
    topGenre,
    topShow,
    topMovie,
  };
}
