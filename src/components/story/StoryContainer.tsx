import { ReactNode, useEffect, useCallback, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

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
          e.preventDefault();
          setShowExitConfirm(true);
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
      {/* Story Header */}
      <div className="story-header">
        <button
          className="story-header-button story-exit-button"
          onClick={() => setShowExitConfirm(true)}
          aria-label="Exit story"
        >
          ✕
        </button>
        <button
          className="story-header-button story-settings-button"
          onClick={() => {
            void navigate("/configure");
          }}
          aria-label="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div
          className="story-exit-modal-overlay"
          onClick={() => setShowExitConfirm(false)}
        >
          <div
            className="story-exit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="story-exit-modal-title">Exit your Wrapped?</h3>
            <p className="story-exit-modal-text">
              You can always come back and view it again.
            </p>
            <div className="story-exit-modal-buttons">
              <button
                className="story-exit-modal-button story-exit-modal-button-primary"
                onClick={() => {
                  void navigate("/");
                }}
              >
                Exit
              </button>
              <button
                className="story-exit-modal-button story-exit-modal-button-secondary"
                onClick={() => setShowExitConfirm(false)}
              >
                Continue Watching
              </button>
            </div>
          </div>
        </div>
      )}

      <StoryProgress
        totalChapters={totalChapters}
        currentChapter={currentChapter}
        position="bottom"
      />
      <div className="story-container-slides">{slidesWithActive}</div>
    </div>
  );
};
