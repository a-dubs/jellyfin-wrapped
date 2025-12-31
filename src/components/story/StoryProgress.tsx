import { motion } from "framer-motion";
import "./StoryProgress.css";

interface StoryProgressProps {
  /** Total number of chapters */
  totalChapters: number;
  /** Current active chapter (1-indexed) */
  currentChapter: number;
  /** Position of the progress indicator */
  position?: "top" | "bottom" | "side";
}

export const StoryProgress = ({
  totalChapters,
  currentChapter,
  position = "bottom",
}: StoryProgressProps) => {
  const dots = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className={`story-progress story-progress-${position}`} role="progressbar" aria-valuenow={currentChapter} aria-valuemin={1} aria-valuemax={totalChapters} aria-label={`Chapter ${currentChapter} of ${totalChapters}`}>
      {dots.map((chapterNum) => {
        const isActive = chapterNum === currentChapter;
        const isPast = chapterNum < currentChapter;

        return (
          <motion.div
            key={chapterNum}
            className={`story-progress-dot ${
              isActive ? "story-progress-dot-active" : ""
            } ${isPast ? "story-progress-dot-past" : ""}`}
            initial={false}
            animate={{
              scale: isActive ? 1.2 : 1,
              opacity: isActive || isPast ? 1 : 0.4,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};
