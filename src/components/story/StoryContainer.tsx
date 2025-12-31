import { ReactNode, useEffect, useCallback } from "react";
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
  /** Current chapter (controlled by parent) */
  currentChapter: number;
}

export const StoryContainer = ({
  totalChapters,
  children,
  onChapterChange,
  currentChapter,
}: StoryContainerProps) => {
  const goToChapter = useCallback(
    (chapter: number) => {
      if (chapter >= 1 && chapter <= totalChapters) {
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

  // Prevent default scroll behavior and lock body scroll
  useEffect(() => {
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
    };

    // Add class to body to prevent scrolling
    document.body.classList.add("story-mode-active");

    // Prevent wheel scrolling
    window.addEventListener("wheel", preventScroll, { passive: false });
    // Prevent touch scrolling
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.classList.remove("story-mode-active");
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedUp: (e) => {
      e.event.preventDefault();
      goToNext();
    },
    onSwipedDown: (e) => {
      e.event.preventDefault();
      goToPrevious();
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 50, // Minimum swipe distance
  });

  // Map children to add active class
  const slidesWithActive = Array.isArray(children)
    ? children.map((child, index) => {
        const chapterNum = index + 1;
        return (
          <div
            key={chapterNum}
            className={currentChapter === chapterNum ? "active" : ""}
          >
            {child}
          </div>
        );
      })
    : children;

  return (
    <div className="story-container" {...handlers}>
      <StoryProgress
        totalChapters={totalChapters}
        currentChapter={currentChapter}
        position="bottom"
      />
      <div className="story-container-slides">{slidesWithActive}</div>
    </div>
  );
};
