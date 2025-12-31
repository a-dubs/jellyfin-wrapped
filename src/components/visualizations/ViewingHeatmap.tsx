import { useMemo } from "react";
import "./ViewingHeatmap.css";

interface ViewingHeatmapProps {
  data: Array<{ dayOfWeek: number; hour: number; count: number }>;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const ViewingHeatmap = ({ data }: ViewingHeatmapProps) => {
  // Create a map for quick lookup
  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((item) => {
      const key = `${item.dayOfWeek}-${item.hour}`;
      map.set(key, item.count);
    });
    return map;
  }, [data]);

  // Find max count for normalization
  const maxCount = useMemo(() => {
    if (data.length === 0) return 1;
    return Math.max(...data.map((item) => item.count), 1);
  }, [data]);

  const getIntensity = (dayOfWeek: number, hour: number): number => {
    const key = `${dayOfWeek}-${hour}`;
    const count = dataMap.get(key) ?? 0;
    return count / maxCount;
  };

  return (
    <div className="viewing-heatmap">
      <div className="heatmap-header">
        <div className="heatmap-hour-label"></div>
        <div className="heatmap-hours">
          {[6, 12, 18, 0].map((hour) => (
            <div key={hour} className="heatmap-hour-marker">
              {hour === 0
                ? "12am"
                : hour === 12
                  ? "12pm"
                  : hour < 12
                    ? `${hour}am`
                    : `${hour - 12}pm`}
            </div>
          ))}
        </div>
      </div>
      <div className="heatmap-grid">
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="heatmap-row">
            <div className="heatmap-day-label">{day}</div>
            <div className="heatmap-cells">
              {HOURS.map((hour) => {
                const intensity = getIntensity(dayIndex, hour);
                const opacity = Math.max(0.1, intensity);
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className="heatmap-cell"
                    style={{
                      opacity,
                      backgroundColor: `rgba(108, 99, 255, ${opacity})`, // accent-electric
                    }}
                    title={`${day} ${hour}:00 - Count: ${dataMap.get(`${dayIndex}-${hour}`) ?? 0}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
