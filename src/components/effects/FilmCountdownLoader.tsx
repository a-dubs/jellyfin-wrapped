import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FilmCountdownLoader.css";

interface FilmCountdownLoaderProps {
  /** Progress percentage (0-100) */
  progress?: number;
  /** Loading message */
  message?: string;
}

export const FilmCountdownLoader = ({
  progress = 0,
  message = "Loading your viewing history",
}: FilmCountdownLoaderProps) => {
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCountdown(false);
    }
  }, [countdown]);

  return (
    <div className="film-countdown-loader">
      <AnimatePresence mode="wait">
        {showCountdown ? (
          <motion.div
            key="countdown"
            className="countdown-display"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="countdown-number">{countdown}</div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="loading-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loading-title">PREPARING YOUR PREMIERE...</div>
            <div className="loading-progress-bar">
              <motion.div
                className="loading-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="loading-message">{message}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
