export type ViewingPersonalityType =
  | "NIGHT_OWL"
  | "EARLY_BIRD"
  | "WEEKEND_WARRIOR"
  | "BINGE_MASTER"
  | "BALANCED";

export interface ViewingPersonality {
  type: ViewingPersonalityType;
  emoji: string;
  label: string;
}

export interface ViewingHabitsData {
  heatmap: Array<{ dayOfWeek: number; hour: number; count: number }>;
  peakDay: string;
  peakHour: string;
  nightOwlPercentage: number;
  personality: ViewingPersonality;
  devices: Array<{ name: string; percentage: number }>;
}

/**
 * Calculate viewing personality based on viewing patterns
 * Based on UI_UX_OVERHAUL.md Appendix D
 */
export function calculateViewingPersonality(
  heatmap: Array<{ dayOfWeek: number; hour: number; count: number }>
): ViewingPersonality {
  if (heatmap.length === 0) {
    return { type: "BALANCED", emoji: "⚖️", label: "Balanced Viewer" };
  }

  // Calculate night owl percentage (% after 9 PM)
  const totalCount = heatmap.reduce((sum, item) => sum + item.count, 0);
  const nightCount = heatmap
    .filter((item) => item.hour >= 21)
    .reduce((sum, item) => sum + item.count, 0);
  const nightOwlPercentage =
    totalCount > 0 ? (nightCount / totalCount) * 100 : 0;

  // Calculate morning percentage (% before noon)
  const morningCount = heatmap
    .filter((item) => item.hour < 12)
    .reduce((sum, item) => sum + item.count, 0);
  const morningPercentage =
    totalCount > 0 ? (morningCount / totalCount) * 100 : 0;

  // Calculate weekend percentage (% on Sat/Sun, where dayOfWeek 0=Sunday, 6=Saturday)
  const weekendCount = heatmap
    .filter((item) => item.dayOfWeek === 0 || item.dayOfWeek === 6)
    .reduce((sum, item) => sum + item.count, 0);
  const weekendPercentage =
    totalCount > 0 ? (weekendCount / totalCount) * 100 : 0;

  // Night Owl: >60% viewing after 9 PM
  if (nightOwlPercentage > 60) {
    return { type: "NIGHT_OWL", emoji: "🦉", label: "Night Owl" };
  }

  // Early Bird: >40% viewing before noon
  if (morningPercentage > 40) {
    return { type: "EARLY_BIRD", emoji: "🐦", label: "Early Bird" };
  }

  // Weekend Warrior: >70% viewing on Sat/Sun
  if (weekendPercentage > 70) {
    return { type: "WEEKEND_WARRIOR", emoji: "⚔️", label: "Weekend Warrior" };
  }

  // Binge Master would need session data (not available from punch card)
  // For now, return Balanced
  return { type: "BALANCED", emoji: "⚖️", label: "Balanced Viewer" };
}

/**
 * Calculate peak viewing day and hour from heatmap data
 */
export function calculatePeakViewing(
  heatmap: Array<{ dayOfWeek: number; hour: number; count: number }>
): { peakDay: string; peakHour: string } {
  if (heatmap.length === 0) {
    return { peakDay: "Unknown", peakHour: "Unknown" };
  }

  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Find peak hour and day
  let maxCount = 0;
  let peakDayOfWeek = 0;
  let peakHourOfDay = 0;

  heatmap.forEach((item) => {
    if (item.count > maxCount) {
      maxCount = item.count;
      peakDayOfWeek = item.dayOfWeek;
      peakHourOfDay = item.hour;
    }
  });

  const peakDay = DAYS[peakDayOfWeek] ?? "Unknown";
  const peakHour = formatHour(peakHourOfDay);

  return { peakDay, peakHour };
}

/**
 * Format hour as 12-hour time string
 */
function formatHour(hour: number): string {
  if (hour === 0) return "12:00 AM";
  if (hour < 12) return `${hour}:00 AM`;
  if (hour === 12) return "12:00 PM";
  return `${hour - 12}:00 PM`;
}

/**
 * Calculate night owl percentage
 */
export function calculateNightOwlPercentage(
  heatmap: Array<{ dayOfWeek: number; hour: number; count: number }>
): number {
  if (heatmap.length === 0) return 0;

  const totalCount = heatmap.reduce((sum, item) => sum + item.count, 0);
  const nightCount = heatmap
    .filter((item) => item.hour >= 21)
    .reduce((sum, item) => sum + item.count, 0);

  return totalCount > 0 ? Math.round((nightCount / totalCount) * 100) : 0;
}
