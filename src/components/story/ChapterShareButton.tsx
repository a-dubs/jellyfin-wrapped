import { useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { toPng } from "html-to-image";
import "./ChapterShareButton.css";

interface ChapterShareButtonProps {
  /** Chapter identifier for filename */
  chapterId: string;
  /** Chapter number for display */
  chapterNumber: number;
  /** Chapter title for share text */
  chapterTitle: string;
  /** Whether this chapter is currently active */
  isActive: boolean;
}

export const ChapterShareButton = ({
  chapterId,
  chapterNumber,
  chapterTitle,
  isActive,
}: ChapterShareButtonProps) => {
  const slideRef = useRef<HTMLElement | null>(null);

  const handleShare = async () => {
    // Find the StorySlide element by chapterId
    const slideElement = document.getElementById(chapterId);
    if (!slideElement) {
      toast.error("Could not find chapter to share");
      return;
    }

    slideRef.current = slideElement;

    try {
      const dataUrl = await toPng(slideElement, {
        pixelRatio: 2,
        backgroundColor: "#0A0A0B",
        filter: (node) => {
          // Exclude the share button itself from the image
          return !(node).classList?.contains(
            "chapter-share-button"
          );
        },
      });

      const year = new Date().getFullYear();
      const filename = `jellyfin-wrapped-${year}-chapter-${chapterNumber}.png`;

      // Try native share first
      if (navigator.share) {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], filename, {
          type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `My Jellyfin Wrapped ${year} - ${chapterTitle}`,
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
        toast.success(`${chapterTitle} copied to clipboard!`);
      } catch (clipboardError) {
        console.error("Failed to copy to clipboard:", clipboardError);
        toast.error("Failed to copy. Downloading instead...");
        // Final fallback: download
        downloadImage(dataUrl, filename);
      }
    } catch (error) {
      console.error("Failed to share:", error);
      toast.error("Failed to share. Downloading instead...");
      const slideElement = document.getElementById(chapterId);
      if (slideElement) {
        const dataUrl = await toPng(slideElement, {
          pixelRatio: 2,
          backgroundColor: "#0A0A0B",
          filter: (node) => {
            return !(node).classList?.contains(
              "chapter-share-button"
            );
          },
        });
        downloadImage(
          dataUrl,
          `jellyfin-wrapped-${new Date().getFullYear()}-chapter-${chapterNumber}.png`
        );
      }
    }
  };

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
    toast.success("Download started!");
  };

  if (!isActive) {
    return null;
  }

  return (
    <motion.button
      className="chapter-share-button"
      onClick={() => {
        void handleShare();
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      aria-label={`Share ${chapterTitle}`}
      title={`Share ${chapterTitle}`}
    >
      <span className="share-icon">📤</span>
    </motion.button>
  );
};
