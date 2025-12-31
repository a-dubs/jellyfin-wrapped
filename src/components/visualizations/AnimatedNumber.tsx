import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
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
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (latest) => {
    return format(latest);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (Math.abs(latest - value) < 0.1 && !isComplete) {
        setIsComplete(true);
        if (confettiOnComplete) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
          });
        }
      }
    });

    return () => unsubscribe();
  }, [springValue, value, isComplete, confettiOnComplete]);

  return (
    <div className={`animated-number animated-number-${size} ${className}`}>
      <motion.div
        className="animated-number-value"
        style={{ display: "inline-block" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay,
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
            duration: 0.5,
            delay: delay + duration * 0.7,
            ease: "easeOut",
          }}
        >
          {unit}
        </motion.div>
      )}
    </div>
  );
};
