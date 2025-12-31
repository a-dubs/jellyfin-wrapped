import { motion } from "framer-motion";
import "./AuroraBackground.css";

interface AuroraBackgroundProps {
  /** Intensity of the aurora effect (0-1) */
  intensity?: number;
  /** Additional CSS classes */
  className?: string;
}

export const AuroraBackground = ({
  intensity = 1,
  className = "",
}: AuroraBackgroundProps) => {
  return (
    <div className={`aurora-background ${className}`} style={{ opacity: intensity }}>
      <div className="aurora-layer aurora-layer-1" />
      <div className="aurora-layer aurora-layer-2" />
      <div className="aurora-layer aurora-layer-3" />
    </div>
  );
};
