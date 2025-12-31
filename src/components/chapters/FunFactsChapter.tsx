import { useMemo } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { ComparisonList } from "../visualizations";
import { useChapterData } from "@/hooks/story/useChapterData";
import { generateFunFacts } from "@/lib/fun-facts";
import { LoadingSpinner } from "../LoadingSpinner";
import "./FunFactsChapter.css";

interface FunFactsChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

export const FunFactsChapter = ({ isActive = false }: FunFactsChapterProps) => {
  const chapterData = useChapterData();

  const funFacts = useMemo(() => {
    return generateFunFacts(chapterData);
  }, [chapterData]);

  if (chapterData.isLoading) {
    return (
      <StorySlide
        chapterId="chapter-8"
        chapterNumber={8}
        background="void"
        accentColor="magenta"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  // Need at least 2 fun facts to show chapter
  if (funFacts.length < 2) {
    return null; // Will be skipped by chapter filtering
  }

  // Convert fun facts to comparison items format
  const comparisonItems = funFacts.map((fact) => ({
    emoji: fact.emoji,
    text: `${fact.title}: ${fact.value}${fact.comparison ? ` - ${fact.comparison}` : ""}`,
  }));

  return (
    <StorySlide
      chapterId="chapter-8"
      chapterNumber={8}
      background="void"
      accentColor="magenta"
      isActive={isActive}
    >
      <div className="fun-facts-chapter">
        <motion.h2
          className="fun-facts-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          FUN FACTS
        </motion.h2>

        <motion.p
          className="fun-facts-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          The quirky stats that make your year unique
        </motion.p>

        <ComparisonList
          items={comparisonItems}
          staggerDelay={0.3}
          initialDelay={0.4}
        />
      </div>
    </StorySlide>
  );
};
