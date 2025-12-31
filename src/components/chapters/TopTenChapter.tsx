import { useMemo } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { TopTenCarousel, TopTenItem } from "../visualizations";
import { useTopTen } from "@/hooks/queries/useTopTen";
import { LoadingSpinner } from "../LoadingSpinner";
import { formatWatchTime } from "@/lib/time-helpers";
import { generateQuip } from "@/lib/quips";
import "./TopTenChapter.css";

interface TopTenChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

export const TopTenChapter = ({ isActive = false }: TopTenChapterProps) => {
  const { data, isLoading, error } = useTopTen();

  const topTenItems = useMemo<TopTenItem[]>(() => {
    if (!data) return [];

    const items: TopTenItem[] = [];

    // Add movies
    data.movies.slice(0, 10).forEach((movie, index) => {
      items.push({
        id: movie.id ?? `movie-${index}`,
        rank: index + 1,
        title: movie.name ?? "Unknown Movie",
        item: movie,
        stats: formatWatchTime((movie.durationSeconds ?? 0) / 60),
        quip: generateQuip(
          {
            id: movie.id ?? "",
            rank: index + 1,
            title: movie.name ?? "",
            item: movie,
            stats: "",
            quip: "",
            type: "movie",
          },
          index + 1,
          10
        ),
        type: "movie",
      });
    });

    // Add shows
    data.shows.slice(0, 10).forEach((show, index) => {
      items.push({
        id: show.item.id ?? `show-${index}`,
        rank: items.length + 1,
        title: show.item.name ?? "Unknown Show",
        item: show.item,
        stats: `${show.episodeCount} episodes • ${formatWatchTime(show.playbackTime / 60)}`,
        quip: generateQuip(
          {
            id: show.item.id ?? "",
            rank: items.length + 1,
            title: show.item.name ?? "",
            item: show.item,
            stats: "",
            quip: "",
            type: "show",
          },
          items.length + 1,
          10
        ),
        type: "show",
      });
    });

    // Sort by rank and take top 10
    return items
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [data]);

  if (isLoading) {
    return (
      <StorySlide
        chapterId="chapter-3"
        chapterNumber={3}
        background="void"
        accentColor="gold"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  if (error || !data || topTenItems.length === 0) {
    return (
      <StorySlide
        chapterId="chapter-3"
        chapterNumber={3}
        background="void"
        accentColor="gold"
        isActive={isActive}
      >
        <div className="top-ten-error">
          <p>Unable to load your top 10</p>
        </div>
      </StorySlide>
    );
  }

  return (
    <StorySlide
      chapterId="chapter-3"
      chapterNumber={3}
      background="gradient-hero"
      accentColor="gold"
      showSwipeHint={true}
      isActive={isActive}
    >
      <div className="top-ten-chapter">
        <motion.div
          className="top-ten-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="top-ten-title">
            <span className="title-decoration">✦</span> YOUR TOP 10{" "}
            <span className="title-decoration">✦</span>
          </h2>
        </motion.div>

        <motion.div
          className="top-ten-carousel-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <TopTenCarousel items={topTenItems} />
        </motion.div>
      </div>
    </StorySlide>
  );
};
