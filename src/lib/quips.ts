import { TopTenItem } from "@/components/visualizations";

const quipTemplates = {
  // For #1 items
  first: [
    "Your absolute obsession",
    "You couldn't look away",
    "The one that got you",
    "Your comfort content",
    "The show that defined your year",
  ],
  // For items watched quickly (high hours/short time span)
  binged: [
    "Devoured in a weekend",
    "Sleep was optional",
    "Who needs a social life?",
    "Binged harder than Netflix intended",
  ],
  // For items watched slowly (spread over months)
  savored: [
    "Savored over time",
    "A slow burn romance",
    "Good things take time",
    "Worth every moment",
  ],
  // For rewatches
  rewatched: [
    "Again... and again",
    "You know every line",
    "Like visiting an old friend",
    "Can't get enough",
  ],
  // Generic fallbacks
  generic: [
    "A worthy investment",
    "Time well spent",
    "No regrets here",
    "Absolutely worth it",
  ],
};

export function generateQuip(
  item: TopTenItem,
  rank: number,
  totalItems: number
): string {
  // First place gets special treatment
  if (rank === 1) {
    return quipTemplates.first[
      Math.floor(Math.random() * quipTemplates.first.length)
    ];
  }

  // Top 3 get better quips
  if (rank <= 3) {
    const pool = [
      ...quipTemplates.binged,
      ...quipTemplates.savored,
      ...quipTemplates.generic,
    ];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Rest get generic
  return quipTemplates.generic[
    Math.floor(Math.random() * quipTemplates.generic.length)
  ];
}
