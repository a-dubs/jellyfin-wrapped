import { useMemo } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { ContentImage } from "../ContentImage";
import { useChapterData } from "@/hooks/story/useChapterData";
import { LoadingSpinner } from "../LoadingSpinner";
import { SimpleItemDto } from "@/lib/queries/types";
import "./DeepCutsChapter.css";

interface DeepCutsChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

export const DeepCutsChapter = ({ isActive = false }: DeepCutsChapterProps) => {
  const chapterData = useChapterData();

  const deepCuts = useMemo(() => {
    const items: Array<{
      type: "oldest-movie" | "oldest-show" | "critically-acclaimed";
      title: string;
      year?: number;
      item: SimpleItemDto;
      rating?: number;
    }> = [];

    if (chapterData.oldestMovie) {
      let year: number | undefined;
      if (chapterData.oldestMovie.date) {
        const date = new Date(chapterData.oldestMovie.date);
        if (!isNaN(date.getTime())) {
          year = date.getFullYear();
        }
      }
      items.push({
        type: "oldest-movie",
        title: chapterData.oldestMovie.name ?? "Unknown Movie",
        year,
        item: chapterData.oldestMovie,
      });
    }

    if (chapterData.oldestShow) {
      let year: number | undefined;
      if (chapterData.oldestShow.date) {
        const date = new Date(chapterData.oldestShow.date);
        if (!isNaN(date.getTime())) {
          year = date.getFullYear();
        }
      }
      items.push({
        type: "oldest-show",
        title: chapterData.oldestShow.name ?? "Unknown Show",
        year,
        item: chapterData.oldestShow,
      });
    }

    // Add top 3 critically acclaimed
    chapterData.criticallyAcclaimed.slice(0, 3).forEach((item) => {
      const rating = item.item.communityRating;
      items.push({
        type: "critically-acclaimed",
        title: item.item.name ?? "Unknown",
        rating: typeof rating === "number" ? rating : undefined,
        item: item.item,
      });
    });

    return items;
  }, [chapterData]);

  if (chapterData.isLoading) {
    return (
      <StorySlide
        chapterId="chapter-6"
        chapterNumber={6}
        background="gradient-hero"
        accentColor="coral"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  if (deepCuts.length === 0) {
    return null; // Will be skipped by chapter filtering
  }

  return (
    <StorySlide
      chapterId="chapter-6"
      chapterNumber={6}
      background="gradient-hero"
      accentColor="coral"
      isActive={isActive}
    >
      <div className="deep-cuts-chapter">
        <motion.h2
          className="deep-cuts-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          DEEP CUTS
        </motion.h2>

        <motion.p
          className="deep-cuts-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          The hidden gems and classics you discovered
        </motion.p>

        <div className="deep-cuts-grid">
          {deepCuts.map((item, index) => (
            <motion.div
              key={`${item.type}-${index}`}
              className="deep-cuts-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <div className="deep-cuts-poster">
                <ContentImage item={item.item} />
                {item.type === "critically-acclaimed" && item.rating && (
                  <div className="deep-cuts-rating">
                    ⭐ {item.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="deep-cuts-info">
                <h3 className="deep-cuts-item-title">{item.title}</h3>
                {item.year && <p className="deep-cuts-year">{item.year}</p>}
                {item.type === "oldest-movie" && (
                  <p className="deep-cuts-label">Oldest Movie</p>
                )}
                {item.type === "oldest-show" && (
                  <p className="deep-cuts-label">Oldest Show</p>
                )}
                {item.type === "critically-acclaimed" && (
                  <p className="deep-cuts-label">Critically Acclaimed</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StorySlide>
  );
};
