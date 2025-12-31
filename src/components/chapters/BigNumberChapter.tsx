import { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import {
  AnimatedNumber,
  ComparisonList,
  ComparisonItem,
} from "../visualizations";
import { announceToScreenReader } from "@/lib/accessibility";
import "./BigNumberChapter.css";

interface BigNumberChapterProps {
  /** Total minutes watched */
  totalMinutes: number;
  /** Whether this slide is active */
  isActive?: boolean;
}

export const BigNumberChapter = ({
  totalMinutes,
  isActive = false,
}: BigNumberChapterProps) => {
  const comparisons = useMemo<ComparisonItem[]>(() => {
    const hours = totalMinutes / 60;
    const days = hours / 24;
    const months = days / 30;

    const items: ComparisonItem[] = [];

    // Days straight
    if (days >= 1) {
      items.push({
        emoji: "🎬",
        text: `${Math.round(days)} ${Math.round(days) === 1 ? "day" : "days"} straight`,
      });
    }

    // All-nighters (8 hour nights)
    const allNighters = Math.round(hours / 8);
    if (allNighters >= 1) {
      items.push({
        emoji: "🌙",
        text: `${allNighters} ${allNighters === 1 ? "all-nighter" : "all-nighters"}`,
      });
    }

    // Flights to Mars (roughly 7 months)
    if (months >= 7) {
      const marsFlights = Math.round(months / 7);
      items.push({
        emoji: "✈️",
        text: `${marsFlights} ${marsFlights === 1 ? "flight" : "flights"} to Mars`,
      });
    }

    // Marathon sessions (if > 100 hours)
    if (hours >= 100) {
      const marathons = Math.round(hours / 24);
      items.push({
        emoji: "🏃",
        text: `${marathons} ${marathons === 1 ? "marathon" : "marathons"} worth of content`,
      });
    }

    // If we don't have enough comparisons, add generic ones
    if (items.length < 3) {
      if (hours >= 24) {
        items.push({
          emoji: "⏰",
          text: `That's ${Math.round(hours)} hours of entertainment`,
        });
      }
      if (items.length < 3 && totalMinutes >= 60) {
        items.push({
          emoji: "📺",
          text: `Enough for ${Math.round(totalMinutes / 60)} ${Math.round(totalMinutes / 60) === 1 ? "hour" : "hours"} of binging`,
        });
      }
    }

    return items.slice(0, 4); // Max 4 comparisons
  }, [totalMinutes]);

  const totalHours = Math.round(totalMinutes / 60);

  // Announce to screen readers when chapter becomes active
  useEffect(() => {
    if (isActive) {
      // Delay announcement to allow animation to complete
      const timer = setTimeout(() => {
        announceToScreenReader(
          `You watched ${totalHours.toLocaleString()} hours this year`
        );
      }, 3000); // After animation completes

      return () => clearTimeout(timer);
    }
  }, [isActive, totalHours]);

  return (
    <StorySlide
      chapterId="chapter-2"
      chapterNumber={2}
      background="aurora"
      accentColor="gold"
      showSwipeHint={true}
      chapterTitle="The Big Number"
      isActive={isActive}
    >
      <div className="big-number-chapter">
        <motion.div
          className="big-number-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="big-number-title">THIS YEAR</h2>
          <h3 className="big-number-subtitle">YOU WATCHED</h3>
        </motion.div>

        <div className="big-number-display">
          <AnimatedNumber
            value={totalHours}
            duration={2.5}
            delay={0.5}
            size="hero"
            unit="HOURS"
            confettiOnComplete={isActive}
            format={(n) => Math.floor(n).toLocaleString()}
          />
        </div>

        <div className="big-number-divider" aria-hidden="true">
          <div className="divider-line" />
          <div className="divider-arrow">▼</div>
          <div className="divider-line" />
        </div>

        <div className="big-number-comparisons">
          <motion.p
            className="comparison-intro"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            That's equivalent to:
          </motion.p>
          <ComparisonList
            items={comparisons}
            animate={isActive}
            initialDelay={3.8}
          />
        </div>
      </div>
    </StorySlide>
  );
};
