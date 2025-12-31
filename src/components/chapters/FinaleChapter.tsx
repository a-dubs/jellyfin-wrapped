import { useRef } from "react";
import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { ShareCard } from "../visualizations/ShareCard";
import { useChapterData } from "@/hooks/story/useChapterData";
import { LoadingSpinner } from "../LoadingSpinner";
import { toPng } from "html-to-image";
import "./FinaleChapter.css";

interface FinaleChapterProps {
  /** Whether this slide is active */
  isActive?: boolean;
}

export const FinaleChapter = ({ isActive = false }: FinaleChapterProps) => {
  const chapterData = useChapterData();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  const totalHours = Math.round(chapterData.totalMinutes / 60);
  const topGenre = chapterData.topGenre?.name ?? null;
  const topShow = chapterData.topShow?.name ?? null;
  const topMovie = chapterData.topMovie?.name ?? null;

  const handleDownload = async () => {
    if (!shareCardRef.current) return;

    try {
      const dataUrl = await toPng(shareCardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#0A0A0B",
      });

      const link = document.createElement("a");
      link.download = `jellyfin-wrapped-${year}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleDownloadClick = () => {
    void handleDownload();
  };

  const handleShare = async () => {
    if (!shareCardRef.current) return;

    try {
      const dataUrl = await toPng(shareCardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#0A0A0B",
      });

      if (navigator.share) {
        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `jellyfin-wrapped-${year}.png`, {
          type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `My Jellyfin Wrapped ${year}`,
            files: [file],
          });
          return;
        }
      }

      // Fallback: copy to clipboard
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        alert("Image copied to clipboard!");
      } catch (clipboardError) {
        console.error("Failed to copy to clipboard:", clipboardError);
        // Final fallback: download
        void handleDownload();
      }
    } catch (error) {
      console.error("Failed to share:", error);
      // Fallback to download
      void handleDownload();
    }
  };

  const handleShareClick = () => {
    void handleShare();
  };

  if (chapterData.isLoading) {
    return (
      <StorySlide
        chapterId="chapter-9"
        chapterNumber={9}
        background="gradient-gold"
        accentColor="gold"
        isActive={isActive}
      >
        <LoadingSpinner />
      </StorySlide>
    );
  }

  return (
    <StorySlide
      chapterId="chapter-9"
      chapterNumber={9}
      background="gradient-gold"
      accentColor="gold"
      isActive={isActive}
    >
      <div className="finale-chapter">
        <motion.h2
          className="finale-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          YOUR YEAR IN ENTERTAINMENT
        </motion.h2>

        <motion.div
          className="finale-card-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ShareCard
            ref={shareCardRef}
            totalHours={totalHours}
            topGenre={topGenre}
            topShow={topShow}
            topMovie={topMovie}
            year={year}
          />
        </motion.div>

        <motion.div
          className="finale-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button className="finale-button" onClick={handleDownloadClick}>
            <span className="finale-button-icon">📸</span>
            <span>DOWNLOAD</span>
          </button>
          <button className="finale-button" onClick={handleShareClick}>
            <span className="finale-button-icon">📱</span>
            <span>SHARE</span>
          </button>
        </motion.div>

        <motion.p
          className="finale-message"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          See you next year! 🎬
        </motion.p>
      </div>
    </StorySlide>
  );
};
