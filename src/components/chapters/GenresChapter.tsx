import { useMemo } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import {
  GenrePieChart,
  GenreData,
  prepareGenreData,
  getGenreIcon,
} from "../visualizations/GenrePieChart";
import { useMovies } from "@/hooks/queries/useMovies";
import { useShows } from "@/hooks/queries/useShows";
import { LoadingSpinner } from "../LoadingSpinner";
import { getTopGenre } from "@/lib/genre-helpers";
import { getPersonalityLabel, generateFlavorText } from "@/lib/personalities";
import "./GenresChapter.css";

interface GenresChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

export const GenresChapter = ({ isActive = false }: GenresChapterProps) => {
  const { data: movies, isLoading: moviesLoading } = useMovies();
  const { data: shows, isLoading: showsLoading } = useShows();

  const genreData = useMemo(() => {
    if (!movies || !shows) return null;

    const allItems = [
      ...movies,
      ...shows.map((show) => show.item),
    ];

    const genreCounts = new Map<string, number>();
    allItems.forEach((item) => {
      item.genres?.forEach((genre: string) => {
        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      });
    });

    if (genreCounts.size === 0) return null;

    const totalItems = allItems.length;
    const genres = prepareGenreData(genreCounts, totalItems);
    const topGenreData = getTopGenre(movies, shows.map((s) => s.item));

    if (!topGenreData) return null;

    const topGenre: GenreData = {
      name: topGenreData.genre,
      percentage: Math.round((topGenreData.count / totalItems) * 100),
      count: topGenreData.count,
      color: "#FFD93D", // Gold for top genre
      icon: getGenreIcon(topGenreData.genre),
    };

    const personalityLabel = getPersonalityLabel(topGenreData.genre);
    const topItem =
      topGenreData.items[0]?.name || "your favorite content";
    const flavorText = generateFlavorText(
      topGenreData.genre,
      topGenreData.count,
      topItem
    );

    return {
      genres,
      topGenre,
      personalityLabel,
      flavorText,
    };
  }, [movies, shows]);

  if (moviesLoading || showsLoading) {
    return (
      <StorySlide
        chapterId="chapter-4"
        chapterNumber={4}
        background="void"
        accentColor="cyan"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  if (!genreData) {
    return (
      <StorySlide
        chapterId="chapter-4"
        chapterNumber={4}
        background="void"
        accentColor="cyan"
        isActive={isActive}
      >
        <div className="genres-error">
          <p>Unable to load genre data</p>
        </div>
      </StorySlide>
    );
  }

  return (
    <StorySlide
      chapterId="chapter-4"
      chapterNumber={4}
      background="aurora"
      accentColor="cyan"
      showSwipeHint={true}
      isActive={isActive}
    >
      <div className="genres-chapter">
        <motion.div
          className="genres-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="genres-title">YOUR TASTE IN {new Date().getFullYear()}</h2>
        </motion.div>

        <motion.div
          className="genres-chart-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <GenrePieChart
            genres={genreData.genres}
            topGenre={genreData.topGenre}
            personalityLabel={genreData.personalityLabel}
            flavorText={genreData.flavorText}
            animate={isActive}
          />
        </motion.div>
      </div>
    </StorySlide>
  );
};
