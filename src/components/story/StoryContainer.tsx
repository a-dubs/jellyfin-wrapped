import { ReactNode, useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { StoryProgress } from "./StoryProgress";
import "./StoryContainer.css";

interface StoryContainerProps {
  /** Total number of chapters */
  totalChapters: number;
  /** Children - should be StorySlide components */
  children: ReactNode;
  /** Callback when chapter changes */
  onChapterChange?: (chapter: number) => void;
  /** Initial chapter (defaults to 1) */
  initialChapter?: number;
}

export const StoryContainer = ({
  totalChapters,
  children,
  onChapterChange,
  initialChapter = 1,
}: StoryContainerProps) => {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);

  const goToChapter = useCallback(
    (chapter: number) => {
      if (chapter >= 1 && chapter <= totalChapters) {
        setCurrentChapter(chapter);
        onChapterChange?.(chapter);
      }
    },
    [totalChapters, onChapterChange]
  );

  const goToNext = useCallback(() => {
    if (currentChapter < totalChapters) {
      goToChapter(currentChapter + 1);
    }
  }, [currentChapter, totalChapters, goToChapter]);

  const goToPrevious = useCallback(() => {
    if (currentChapter > 1) {
      goToChapter(currentChapter - 1);
    }
  }, [currentChapter, goToChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case " ":
          e.preventDefault();
          goToNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          goToPrevious();
          break;
        case "Home":
          e.preventDefault();
          goToChapter(1);
          break;
        case "End":
          e.preventDefault();
          goToChapter(totalChapters);
          break;
        case "Escape":
          // Could navigate away from story mode
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChapter, totalChapters, goToNext, goToPrevious, goToChapter]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedUp: goToNext,
    onSwipedDown: goToPrevious,
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 50, // Minimum swipe distance
  });

  // Scroll to current chapter
  useEffect(() => {
    const currentSlide = document.getElementById(`chapter-${currentChapter}`);
    if (currentSlide) {
      currentSlide.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentChapter]);

  return (
    <div className="story-container" {...handlers}>
      <StoryProgress
        totalChapters={totalChapters}
        currentChapter={currentChapter}
        position="bottom"
      />
      <div className="story-container-slides">{children}</div>
    </div>
  );
};
