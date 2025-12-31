import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ContentImage } from "../ContentImage";
import { SimpleItemDto } from "@/lib/queries";
import { formatWatchTime } from "@/lib/time-helpers";
import "./TopTenCarousel.css";

export interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl?: string;
  item: SimpleItemDto;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}

export const TopTenCarousel = ({
  items,
  onItemChange,
}: TopTenCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
      onItemChange?.(index);
    }
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    onItemChange?.(currentIndex);
  }, [currentIndex, onItemChange]);

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 50,
  });

  const currentItem = items[currentIndex];

  if (!currentItem) return null;

  return (
    <div className="top-ten-carousel" {...handlers} ref={carouselRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="top-ten-card"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {/* Rank Badge */}
          <div className="top-ten-rank">
            <div className="rank-trophy">🏆</div>
            <div className="rank-number">#{currentItem.rank}</div>
          </div>

          {/* Poster */}
          <div className="top-ten-poster">
            <ContentImage item={currentItem.item} />
            <div className="poster-glow" />
          </div>

          {/* Content */}
          <div className="top-ten-content">
            <h3 className="top-ten-title">{currentItem.title}</h3>
            <p className="top-ten-stats">{currentItem.stats}</p>
            <p className="top-ten-quip">"{currentItem.quip}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="top-ten-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`top-ten-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            className="top-ten-nav top-ten-nav-prev"
            onClick={goToPrevious}
            aria-label="Previous item"
          >
            ←
          </button>
          <button
            className="top-ten-nav top-ten-nav-next"
            onClick={goToNext}
            aria-label="Next item"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};
