import { useMemo } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { useChapterData } from "@/hooks/story/useChapterData";
import { LoadingSpinner } from "../LoadingSpinner";
import "./JourneyChapter.css";

interface JourneyChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const JourneyChapter = ({ isActive = false }: JourneyChapterProps) => {
  const chapterData = useChapterData();

  const journey = useMemo(() => {
    if (!chapterData.monthlyStats || chapterData.monthlyStats.length === 0) {
      return null;
    }

    const monthlyData = chapterData.monthlyStats.map((stat) => ({
      month: MONTHS[stat.month.getMonth()] ?? "Unknown",
      totalMinutes: stat.totalWatchTimeMinutes,
      topItem: stat.topShow.item.name ?? "Unknown",
    }));

    // Find busiest and quietest months
    const sortedByMinutes = [...monthlyData].sort(
      (a, b) => b.totalMinutes - a.totalMinutes
    );
    const busiestMonth = sortedByMinutes[0]?.month ?? "Unknown";
    const quietestMonth =
      sortedByMinutes[sortedByMinutes.length - 1]?.month ?? "Unknown";

    // Find max for normalization
    const maxMinutes = Math.max(...monthlyData.map((m) => m.totalMinutes), 1);

    return {
      monthlyData,
      busiestMonth,
      quietestMonth,
      maxMinutes,
    };
  }, [chapterData]);

  if (chapterData.isLoading) {
    return (
      <StorySlide
        chapterId="chapter-7"
        chapterNumber={7}
        background="aurora"
        accentColor="cyan"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  if (!journey || journey.monthlyData.length === 0) {
    return null; // Will be skipped by chapter filtering
  }

  return (
    <StorySlide
      chapterId="chapter-7"
      chapterNumber={7}
      background="aurora"
      accentColor="cyan"
      chapterTitle="The Journey"
      isActive={isActive}
    >
      <div className="journey-chapter">
        <motion.h2
          className="journey-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          THE JOURNEY
        </motion.h2>

        <motion.p
          className="journey-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Your viewing journey through the year
        </motion.p>

        <div className="journey-timeline">
          {journey.monthlyData.map((month, index) => {
            const height = (month.totalMinutes / journey.maxMinutes) * 100;
            return (
              <motion.div
                key={month.month}
                className="journey-month"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={
                  isActive
                    ? { opacity: 1, scaleY: 1 }
                    : { opacity: 0, scaleY: 0 }
                }
                transition={{
                  delay: 0.3 + index * 0.05,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <div className="journey-bar-container">
                  <div
                    className="journey-bar"
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                </div>
                <div className="journey-month-label">{month.month}</div>
                <div className="journey-month-value">
                  {Math.round(month.totalMinutes / 60)}h
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="journey-insights"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="journey-insight">
            Busiest month: <strong>{journey.busiestMonth}</strong>
          </p>
          <p className="journey-insight">
            Quietest month: <strong>{journey.quietestMonth}</strong>
          </p>
        </motion.div>
      </div>
    </StorySlide>
  );
};
