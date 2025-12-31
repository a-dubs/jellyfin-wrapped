import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { prefersReducedMotion, shouldShowEffects } from "@/lib/motion-config";
import "./AnimatedNumber.css";

interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const defaultFormat = (n: number): string => {
  return Math.floor(n).toLocaleString();
};

export const AnimatedNumber = ({
  value,
  duration = 2.5,
  format = defaultFormat,
  delay = 0,
  size = "stat",
  unit,
  confettiOnComplete = false,
  className = "",
}: AnimatedNumberProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const reducedMotion = prefersReducedMotion();
  const effectiveDuration = reducedMotion ? 0 : duration;
  const effectiveDelay = reducedMotion ? 0 : delay;

  const motionValue = useMotionValue(reducedMotion ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: effectiveDuration * 1000,
  });

  const displayValue = useTransform(springValue, (latest) => {
    return format(latest);
  });

  useEffect(() => {
    if (reducedMotion) {
      motionValue.set(value);
      setIsComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      motionValue.set(value);
    }, effectiveDelay * 1000);

    return () => clearTimeout(timeout);
  }, [value, effectiveDelay, motionValue, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setIsComplete(true);
      return;
    }

    const unsubscribe = springValue.on("change", (latest: number) => {
      if (Math.abs(latest - value) < 0.1 && !isComplete) {
        setIsComplete(true);
        if (confettiOnComplete && shouldShowEffects()) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
          });
        }
      }
    });

    return () => {
       
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [springValue, value, isComplete, confettiOnComplete, reducedMotion]);

  return (
    <div className={`animated-number animated-number-${size} ${className}`}>
      <motion.div
        className="animated-number-value"
        style={{ display: "inline-block" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 0.5,
          delay: effectiveDelay,
          ease: "easeOut",
        }}
      >
        <motion.span
          className="animated-number-text"
          style={{ display: "inline-block" }}
        >
          {displayValue}
        </motion.span>
      </motion.div>
      {unit && (
        <motion.div
          className="animated-number-unit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            delay: reducedMotion ? 0 : effectiveDelay + effectiveDuration * 0.7,
            ease: "easeOut",
          }}
        >
          {unit}
        </motion.div>
      )}
    </div>
  );
};
