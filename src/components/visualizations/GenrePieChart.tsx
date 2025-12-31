import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "./GenrePieChart.css";

export interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenrePieChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
  /** Whether to animate */
  animate?: boolean;
}

// Color palette for genres
const genreColors = [
  "#FFD93D", // Gold
  "#FF6B6B", // Coral
  "#4ECDC4", // Cyan
  "#C44CFF", // Magenta
  "#6C63FF", // Electric
  "#FF9F66", // Orange
  "#95E1D3", // Mint
  "#F38181", // Pink
];

const genreIcons: Record<string, string> = {
  "Sci-Fi": "🚀",
  "Science Fiction": "🚀",
  Drama: "🎭",
  Comedy: "😂",
  Action: "💥",
  Horror: "👻",
  Thriller: "🔪",
  Romance: "💕",
  Documentary: "📹",
  Animation: "🎨",
  Fantasy: "✨",
  Mystery: "🔍",
};

export const GenrePieChart = ({
  genres,
  topGenre,
  personalityLabel,
  flavorText,
  animate = true,
}: GenrePieChartProps) => {
  const [selectedGenre, setSelectedGenre] = useState<GenreData | null>(null);

  // Calculate SVG path for pie chart segments
  const segments = useMemo(() => {
    let currentAngle = -90; // Start at top
    const radius = 120;
    const centerX = 150;
    const centerY = 150;

    return genres.map((genre) => {
      const angle = (genre.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");

      const segment = {
        ...genre,
        pathData,
        startAngle,
        endAngle,
      };

      currentAngle += angle;
      return segment;
    });
  }, [genres]);

  const handleSegmentClick = (genre: GenreData) => {
    setSelectedGenre(selectedGenre?.name === genre.name ? null : genre);
  };

  return (
    <div className="genre-pie-chart">
      <div className="genre-chart-container">
        <svg
          viewBox="0 0 300 300"
          className="genre-svg"
          style={{ maxWidth: "300px", width: "100%" }}
        >
          {segments.map((segment, index) => (
            <motion.path
              key={segment.name}
              d={segment.pathData}
              fill={segment.color}
              stroke="var(--bg-void)"
              strokeWidth="2"
              initial={animate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
              animate={animate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              onClick={() => handleSegmentClick(segment)}
              className={`genre-segment ${
                selectedGenre?.name === segment.name ? "selected" : ""
              }`}
              style={{ cursor: "pointer" }}
            />
          ))}
        </svg>

        {/* Center label */}
        <div className="genre-center-label">
          <div className="genre-top-icon">{topGenre.icon}</div>
          <div className="genre-top-name">{topGenre.name}</div>
          <div className="genre-top-percentage">{topGenre.percentage}%</div>
        </div>
      </div>

      {/* Genre legend */}
      <div className="genre-legend">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.name}
            className={`genre-legend-item ${
              selectedGenre?.name === genre.name ? "selected" : ""
            }`}
            onClick={() => handleSegmentClick(genre)}
            initial={animate ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            animate={animate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{
              delay: 0.5 + index * 0.1,
              duration: 0.4,
            }}
          >
            <div
              className="genre-legend-color"
              style={{ backgroundColor: genre.color }}
            />
            <div className="genre-legend-text">
              <span className="genre-legend-name">{genre.name}</span>
              <span className="genre-legend-percentage">{genre.percentage}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Personality section */}
      <div className="genre-personality">
        <motion.div
          className="personality-label"
          initial={animate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {personalityLabel}
        </motion.div>
        <motion.p
          className="personality-text"
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={animate ? { opacity: 1 } : { opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {flavorText}
        </motion.p>
      </div>
    </div>
  );
};

// Helper function to get genre icon
export function getGenreIcon(genreName: string): string {
  return genreIcons[genreName] || "📺";
}

// Helper function to prepare genre data
export function prepareGenreData(
  genreCounts: Map<string, number>,
  totalItems: number
): GenreData[] {
  const sortedGenres = Array.from(genreCounts.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / totalItems) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 genres

  return sortedGenres.map((genre, index) => ({
    ...genre,
    color: genreColors[index % genreColors.length],
    icon: getGenreIcon(genre.name),
  }));
}
