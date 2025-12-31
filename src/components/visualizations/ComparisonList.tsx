import { motion } from "framer-motion";
import "./ComparisonList.css";

export interface ComparisonItem {
  emoji: string;
  text: string;
}

interface ComparisonListProps {
  /** List of comparisons to reveal */
  items: ComparisonItem[];
  /** Delay between each item reveal */
  staggerDelay?: number; // default: 0.3s
  /** Delay before first item */
  initialDelay?: number; // default: 0.5s
  /** Whether to start animation */
  animate?: boolean;
}

export const ComparisonList = ({
  items,
  staggerDelay = 0.3,
  initialDelay = 0.5,
  animate = true,
}: ComparisonListProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // ease-out-back
      },
    },
  };

  return (
    <motion.div
      className="comparison-list"
      variants={containerVariants}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="comparison-item"
          variants={itemVariants}
        >
          <span className="comparison-emoji" aria-hidden="true">
            {item.emoji}
          </span>
          <span className="comparison-text">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
