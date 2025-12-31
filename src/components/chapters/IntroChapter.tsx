import { motion } from "framer-motion";
import { StorySlide } from "../story";
import { FilmCountdownLoader } from "../effects";
import { useChapterData } from "@/hooks/story/useChapterData";
import "./IntroChapter.css";

interface IntroChapterProps {
  /** Year for the wrapped */
  year: number;
  /** Callback when user clicks to start */
  onStart: () => void;
  /** Whether this slide is active */
  isActive?: boolean;
}

export const IntroChapter = ({
  year,
  onStart,
  isActive = false,
}: IntroChapterProps) => {
  const { isLoading, hasError } = useChapterData();
  // Show loading state while data is fetching
  if (isLoading) {
    return (
      <StorySlide
        chapterId="chapter-1"
        chapterNumber={1}
        background="gradient-hero"
        accentColor="gold"
        showSwipeHint={false}
        isActive={isActive}
      >
        <FilmCountdownLoader message="Loading your viewing history" />
      </StorySlide>
    );
  }

  // Show error state if loading failed
  if (hasError) {
    return (
      <StorySlide
        chapterId="chapter-1"
        chapterNumber={1}
        background="gradient-hero"
        accentColor="gold"
        showSwipeHint={false}
        isActive={isActive}
      >
        <div className="intro-error-state">
          <div className="error-icon">🎬</div>
          <h2 className="error-title">Technical Difficulties</h2>
          <p className="error-message">
            We couldn't load your viewing data. Please check your connection and
            try again.
          </p>
          <button
            className="intro-start-button"
            onClick={() => window.location.reload()}
          >
            <span>TAKE 2</span>
          </button>
        </div>
      </StorySlide>
    );
  }

  const titleText = "JELLYFIN";
  const subtitleText = "WRAPPED";
  const yearText = year.toString();

  // Letter-by-letter animation for title
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <StorySlide
      chapterId="chapter-1"
      chapterNumber={1}
      background="gradient-hero"
      accentColor="gold"
      showSwipeHint={false}
      showShareButton={false}
      chapterTitle="Intro"
      isActive={isActive}
    >
      <div className="intro-chapter">
        {/* Spotlight effect */}
        <div className="intro-spotlight" />

        {/* Film reel icon */}
        <motion.div
          className="intro-film-reel"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 1 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="film-reel-hole film-reel-hole-1" />
          <div className="film-reel-hole film-reel-hole-2" />
          <div className="film-reel-hole film-reel-hole-3" />
          <div className="film-reel-hole film-reel-hole-4" />
        </motion.div>

        {/* Title with letter-by-letter reveal */}
        <div className="intro-title">
          {titleText.split("").map((letter, i) => (
            <motion.span
              key={`title-${i}`}
              custom={i}
              variants={titleVariants}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              className="intro-title-letter"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.div
          className="intro-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {subtitleText.split("").map((letter, i) => (
            <motion.span
              key={`subtitle-${i}`}
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 + i * 0.05, duration: 0.3 }}
              className="intro-subtitle-letter"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Year */}
        <motion.div
          className="intro-year"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        >
          {yearText.split("").map((digit, i) => (
            <motion.span
              key={`year-${i}`}
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{
                delay: 1.6 + i * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="intro-year-digit"
            >
              {digit}
            </motion.span>
          ))}
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <button
            className="intro-start-button"
            onClick={onStart}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            <span className="intro-start-icon">▶</span>
            <span>REVEAL YOUR YEAR</span>
          </button>
        </motion.div>

        {/* Film strip perforations */}
        <div className="intro-film-strip" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="intro-perforation" />
          ))}
        </div>
      </div>
    </StorySlide>
  );
};
