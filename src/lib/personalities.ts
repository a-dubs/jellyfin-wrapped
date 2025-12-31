const genrePersonalities: Record<string, string[]> = {
  "Sci-Fi": ["SCI-FI OBSESSED", "SPACE CADET", "FUTURE DWELLER"],
  "Science Fiction": ["SCI-FI OBSESSED", "SPACE CADET", "FUTURE DWELLER"],
  Drama: ["DRAMA ADDICT", "EMOTIONAL EXPLORER", "FEELS SEEKER"],
  Comedy: ["LAUGH HUNTER", "JOY SEEKER", "COMEDY CONNOISSEUR"],
  Action: ["ADRENALINE JUNKIE", "THRILL SEEKER", "ACTION HERO"],
  Horror: ["FEAR ENTHUSIAST", "NIGHTMARE COLLECTOR", "SCARE SEEKER"],
  Documentary: ["TRUTH SEEKER", "KNOWLEDGE HUNTER", "REALITY CHECKER"],
  Animation: ["ANIMATION AFICIONADO", "TOON LOVER", "ANIMATED SOUL"],
  Romance: ["HOPELESS ROMANTIC", "LOVE STORY LOVER", "HEART COLLECTOR"],
  Thriller: ["SUSPENSE ADDICT", "EDGE OF SEAT VIEWER", "THRILL SEEKER"],
  Mystery: ["DETECTIVE MODE", "PUZZLE SOLVER", "MYSTERY HUNTER"],
  Fantasy: ["FANTASY FANATIC", "MAGIC SEEKER", "REALM EXPLORER"],
};

export function getPersonalityLabel(topGenre: string): string {
  const options = genrePersonalities[topGenre] || ["ECLECTIC VIEWER"];
  return options[Math.floor(Math.random() * options.length)];
}

export function generateFlavorText(
  genre: string,
  count: number,
  topItem?: string
): string {
  const templates: Record<string, string[]> = {
    "Sci-Fi": [
      `You explored ${count} new worlds this year.`,
      `Your spaceship logged ${count} light-years of content.`,
      `${count} sci-fi titles? You're basically a space station commander.`,
    ],
    "Science Fiction": [
      `You explored ${count} new worlds this year.`,
      `Your spaceship logged ${count} light-years of content.`,
      `${count} sci-fi titles? You're basically a space station commander.`,
    ],
    Drama: [
      `You experienced ${count} emotional journeys.`,
      `${count} dramas means ${count} times you felt ALL the feels.`,
      `Your heart went through ${count} dramatic arcs this year.`,
    ],
    Comedy: [
      `You laughed through ${count} comedic masterpieces.`,
      `${count} comedies = ${count} reasons to smile.`,
      `Your funny bone got a serious workout with ${count} titles.`,
    ],
    Action: [
      `You survived ${count} action-packed adventures.`,
      `${count} action titles? Your adrenaline must be through the roof.`,
      `You've seen more explosions than a demolition expert.`,
    ],
  };

  const genreTemplates = templates[genre] || [
    `You watched ${count} ${genre.toLowerCase()} titles this year.`,
    `Your ${genre.toLowerCase()} collection grew by ${count} titles.`,
  ];

  const template =
    genreTemplates[Math.floor(Math.random() * genreTemplates.length)];

  if (topItem) {
    return `${template} Your top pick: ${topItem}`;
  }

  return template;
}
