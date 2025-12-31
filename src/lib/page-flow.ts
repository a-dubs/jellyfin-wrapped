/**
 * Page Flow Management
 * 
 * This module handles:
 * 1. Defining the page navigation flow order
 * 2. Building dynamic navigation chains
 * 3. Providing utilities for next/previous page navigation
 * 
 * Note: Actual empty data checking happens in components using usePageDataCheck hook.
 * This file just defines the navigation order.
 */

export interface PageFlowConfig {
  path: string;
  name: string;
}

/**
 * Define the complete page flow in navigation order.
 * Pages will automatically skip if they have no data (handled by components).
 */
export const pageFlowConfig: PageFlowConfig[] = [
  {
    path: "/TopTen",
    name: "Top 10",
  },
  {
    path: "/movies",
    name: "Movies",
  },
  {
    path: "/shows",
    name: "TV Shows",
  },
  {
    path: "/audio",
    name: "Music",
  },
  {
    path: "/music-videos",
    name: "Music Videos",
  },
  {
    path: "/actors",
    name: "Favorite Actors",
  },
  {
    path: "/genres",
    name: "Genres",
  },
  {
    path: "/tv",
    name: "Live TV",
  },
  {
    path: "/critically-acclaimed",
    name: "Critically Acclaimed",
  },
  {
    path: "/oldest-movie",
    name: "Oldest Movie",
  },
  {
    path: "/oldest-show",
    name: "Oldest Show",
  },
  // REMOVED: /holidays - user says it's ridiculous
  {
    path: "/minutes-per-day",
    name: "Minutes Per Day",
  },
  {
    path: "/show-of-the-month",
    name: "Show of the Month",
  },
  {
    path: "/unfinished-shows",
    name: "Unfinished Shows",
  },
  {
    path: "/device-stats",
    name: "Device Stats",
  },
  {
    path: "/punch-card",
    name: "Activity Calendar",
  },
];

/**
 * Get the next page in the flow.
 * Returns null if current page is last or not found.
 */
export function getNextPage(currentPath: string): string | null {
  const currentIndex = pageFlowConfig.findIndex((page) => page.path === currentPath);
  if (currentIndex === -1 || currentIndex === pageFlowConfig.length - 1) {
    return null;
  }
  
  return pageFlowConfig[currentIndex + 1].path;
}

/**
 * Get the previous page in the flow.
 * Returns null if current page is first or not found.
 */
export function getPreviousPage(currentPath: string): string | null {
  const currentIndex = pageFlowConfig.findIndex((page) => page.path === currentPath);
  if (currentIndex <= 0) {
    return null;
  }
  
  return pageFlowConfig[currentIndex - 1].path;
}
