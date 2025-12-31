import { useMemo } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { ViewingHeatmap } from "../visualizations";
import { useChapterData } from "@/hooks/story/useChapterData";
import {
  calculateViewingPersonality,
  calculatePeakViewing,
  calculateNightOwlPercentage,
} from "@/lib/viewing-personality";
import { LoadingSpinner } from "../LoadingSpinner";
import "./HabitsChapter.css";

interface HabitsChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

export const HabitsChapter = ({ isActive = false }: HabitsChapterProps) => {
  const chapterData = useChapterData();

  const viewingHabits = useMemo(() => {
    if (!chapterData.punchCardData || chapterData.punchCardData.length === 0) {
      return null;
    }

    const personality = calculateViewingPersonality(chapterData.punchCardData);
    const { peakDay, peakHour } = calculatePeakViewing(
      chapterData.punchCardData
    );
    const nightOwlPercentage = calculateNightOwlPercentage(
      chapterData.punchCardData
    );

    // Calculate device percentages
    const devices =
      chapterData.deviceStats?.deviceUsage.map((device) => {
        const totalMinutes =
          chapterData.deviceStats?.deviceUsage.reduce(
            (sum, d) => sum + d.minutes,
            0
          ) ?? 1;
        return {
          name: device.deviceName,
          percentage: Math.round((device.minutes / totalMinutes) * 100),
        };
      }) ?? [];

    return {
      personality,
      peakDay,
      peakHour,
      nightOwlPercentage,
      devices,
    };
  }, [chapterData]);

  if (chapterData.isLoading) {
    return (
      <StorySlide
        chapterId="chapter-5"
        chapterNumber={5}
        background="void"
        accentColor="electric"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  if (!viewingHabits || chapterData.punchCardData.length === 0) {
    return null; // Will be skipped by chapter filtering
  }

  return (
    <StorySlide
      chapterId="chapter-5"
      chapterNumber={5}
      background="void"
      accentColor="electric"
      chapterTitle="Viewing Habits"
      isActive={isActive}
    >
      <div className="habits-chapter">
        <motion.h2
          className="habits-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          WHEN DO YOU WATCH?
        </motion.h2>

        <motion.div
          className="habits-heatmap-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ViewingHeatmap data={chapterData.punchCardData} />
        </motion.div>

        <motion.div
          className="habits-personality"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="habits-personality-badge">
            <span className="habits-personality-emoji">
              {viewingHabits.personality.emoji}
            </span>
            <span className="habits-personality-label">
              {viewingHabits.personality.label.toUpperCase()}
            </span>
          </div>

          <p className="habits-insight">
            {viewingHabits.nightOwlPercentage}% of your viewing happened after 9
            PM
          </p>
          <p className="habits-peak">
            Peak time: {viewingHabits.peakDay} @ {viewingHabits.peakHour}
          </p>
        </motion.div>
      </div>
    </StorySlide>
  );
};
