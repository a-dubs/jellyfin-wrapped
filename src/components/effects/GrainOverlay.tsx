import "./GrainOverlay.css";

interface GrainOverlayProps {
  /** Opacity of the grain effect (0-1) */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
}

export const GrainOverlay = ({
  opacity = 0.05,
  className = "",
}: GrainOverlayProps) => {
  // Generate SVG noise pattern
  const noisePattern = `data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

  return (
    <div
      className={`grain-overlay ${className}`}
      style={{
        opacity,
        backgroundImage: `url("${noisePattern}")`,
      }}
      aria-hidden="true"
    />
  );
};
