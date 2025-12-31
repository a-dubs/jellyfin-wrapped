import { motion, Variants } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { AuroraBackground, GrainOverlay } from "../effects";
import { getMotionConfig, shouldShowEffects } from "@/lib/motion-config";
import "./StorySlide.css";

export type BackgroundVariant =
  | "void"
  | "aurora"
  | "gradient-gold"
  | "gradient-hero";

export type AccentColor = "gold" | "coral" | "cyan" | "magenta" | "electric";

interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: BackgroundVariant;
  /** Accent color for this slide */
  accentColor?: AccentColor;
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
  /** Whether this slide is currently active */
  isActive?: boolean;
}

const transitionVariants: Record<string, Variants> = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },
  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
    exit: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
  },
  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};

export const StorySlide = ({
  chapterId,
  chapterNumber,
  background = "void",
  accentColor = "gold",
  showSwipeHint = false,
  children,
  onEnter,
  onExit,
  isActive = false,
}: StorySlideProps) => {
  useEffect(() => {
    if (isActive && onEnter) {
      onEnter();
    }
    return () => {
      if (!isActive && onExit) {
        onExit();
      }
    };
  }, [isActive, onEnter, onExit]);

  const backgroundClass = `story-slide-bg-${background}`;
  const accentClass = `story-slide-accent-${accentColor}`;

  return (
    <motion.div
      className={`story-slide ${backgroundClass} ${accentClass}`}
      variants={transitionVariants.verticalSlide}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={getMotionConfig().transition}
      id={chapterId}
      role="region"
      aria-label={`Chapter ${chapterNumber}`}
      aria-live={isActive ? "polite" : "off"}
    >
      {background === "aurora" && shouldShowEffects() && <AuroraBackground />}
      {shouldShowEffects() && <GrainOverlay opacity={0.03} />}
      <div className="story-slide-content">{children}</div>
      {showSwipeHint && (
        <div className="story-slide-hint" aria-hidden="true">
          <span>▼ Swipe down to continue</span>
        </div>
      )}
    </motion.div>
  );
};
