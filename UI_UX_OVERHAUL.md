# 🎬 Jellyfin Wrapped: Bold UI/UX Overhaul Proposal

## Executive Summary

This document proposes a complete visual and experiential transformation of Jellyfin Wrapped, inspired by the best practices of Spotify Wrapped, Apple Music Replay, YouTube Recap, and Netflix's year-in-review experiences. The goal is to create something that feels **memorable, shareable, and genuinely delightful** to use.

---

## Current State Analysis

### What Works ✅

- Solid data fetching infrastructure (React Query)
- Good component structure foundation
- Basic page flow with navigation
- Functional data visualizations

### What Needs Work ❌

| Issue                 | Current State                    | Problem                                                                                        |
| --------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Visual Identity**   | Generic purple + yellow gradient | Looks like default Bootstrap/template                                                          |
| **Typography**        | System fonts, uniform sizing     | Forgettable, no personality                                                                    |
| **Animations**        | Basic fade/slide                 | No wow factor, no storytelling                                                                 |
| **Page Layout**       | Traditional app layout with nav  | Doesn't feel like a "reveal" experience                                                        |
| **Data Presentation** | Dense grids, lists               | Information overload, not celebratory                                                          |
| **User Journey**      | Linear nav with prev/next        | No sense of progression or anticipation                                                        |
| **Mobile Experience** | Responsive but basic             | Not optimized for the primary use case (Fixed: Implemented `dvh` units and responsive spacing) |
| **Shareability**      | None                             | Missing viral potential                                                                        |

### Visual Audit - Current Aesthetic Problems

1. **"AI Slop" Alert**: Purple gradients with yellow accents is the most overused AI-generated color scheme
2. **Flat Cards**: White text on colored backgrounds with basic rounded corners
3. **Chart Styling**: Default d3/nivo colors that don't match any theme
4. **Loading States**: Plain spinner, no anticipation building
5. **Navigation**: Generic hamburger menu side drawer
6. **No Emotional Peaks**: Every page has the same visual weight

---

## The Vision: "Cinema Unwrapped"

### Design Philosophy

> **"Your year in entertainment, told like a movie premiere"**

Transform Jellyfin Wrapped from a "data dashboard" into a **cinematic reveal experience**. Think: film credits meeting award show graphics, with the drama and excitement of revealing your entertainment journey.

### Core Design Principles

1. **Full-Screen Storytelling** - Each slide is a cinematic moment
2. **Build Anticipation** - Tease, reveal, celebrate
3. **Bold Typography** - Type as hero, not supporting character
4. **Dramatic Lighting** - Dark themes with spotlight effects
5. **Motion with Purpose** - Every animation tells part of the story
6. **Shareable Moments** - Screenshot-worthy designs
7. **Personal Touch** - Data feels like it's speaking directly to YOU

---

## Typography System

### Font Selection

#### Primary: **Space Mono** + **Clash Display**

- **Clash Display** (Headings): Bold, geometric display face with personality
- **Space Mono** (Stats/Data): Technical feel for numbers, film credit aesthetic

```css
/* Alternative Combinations */
Option A: Clash Display + JetBrains Mono
Option B: Cabinet Grotesk + IBM Plex Mono
Option C: Satoshi + Source Code Pro
```

### Type Scale

```css
--text-hero: clamp(4rem, 15vw, 12rem); /* Big reveal numbers */
--text-title: clamp(2rem, 6vw, 4rem); /* Page titles */
--text-subtitle: clamp(1.25rem, 3vw, 2rem); /* Supporting text */
--text-stat: clamp(3rem, 10vw, 8rem); /* Statistics */
--text-body: clamp(1rem, 2vw, 1.25rem); /* Body text */
--text-caption: 0.875rem; /* Small text */
```

---

## Color System

### The Palette: "Midnight Premiere"

Abandon the generic purple gradient. Embrace a **dark, cinematic palette** with dramatic accent lighting.

```css
:root {
  /* Base - Deep, rich blacks and dark grays */
  --bg-void: #0a0a0b; /* Deepest black */
  --bg-surface: #121214; /* Card surfaces */
  --bg-elevated: #1a1a1e; /* Elevated elements */
  --bg-overlay: rgba(0, 0, 0, 0.8); /* Overlays */

  /* Accent Lighting - Neon cinema vibes */
  --accent-gold: #ffd93d; /* Achievement gold */
  --accent-coral: #ff6b6b; /* Warm highlights */
  --accent-cyan: #4ecdc4; /* Cool data points */
  --accent-magenta: #c44cff; /* Dramatic accent */
  --accent-electric: #6c63ff; /* Interactive elements */

  /* Gradients - For dramatic backgrounds */
  --gradient-hero: linear-gradient(
    135deg,
    #0a0a0b 0%,
    #1a1a2e 50%,
    #16213e 100%
  );
  --gradient-gold: linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%);
  --gradient-aurora: linear-gradient(
    180deg,
    #0a0a0b 0%,
    #1a1a2e 30%,
    #2a1a4e 60%,
    #0a0a0b 100%
  );

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.4);

  /* Glow Effects */
  --glow-gold: 0 0 60px rgba(255, 217, 61, 0.4);
  --glow-cyan: 0 0 60px rgba(78, 205, 196, 0.4);
  --glow-magenta: 0 0 60px rgba(196, 76, 255, 0.4);
}
```

### Per-Section Accent Colors

| Section | Primary Accent | Secondary  | Mood         |
| ------- | -------------- | ---------- | ------------ |
| Top 10  | Gold           | Warm White | Celebratory  |
| Movies  | Coral/Red      | Orange     | Cinematic    |
| Shows   | Cyan           | Teal       | Binge-worthy |
| Audio   | Magenta        | Purple     | Musical      |
| Stats   | Electric Blue  | Indigo     | Analytical   |
| Finale  | Gold Gradient  | All colors | Grand finale |

---

## Page Structure Overhaul

### New "Story Mode" Experience

Transform from: **Dashboard with pages**
Transform to: **Vertical story with chapters**

```
┌──────────────────────────────────────────────┐
│                                              │
│            ▼ SWIPE DOWN TO BEGIN             │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │   CHAPTER 1: THE YEAR IN NUMBERS       │  │
│  │                                        │  │
│  │          ╔══════════════╗              │  │
│  │          ║              ║              │  │
│  │          ║     2,847    ║              │  │
│  │          ║   HOURS      ║              │  │
│  │          ║              ║              │  │
│  │          ╚══════════════╝              │  │
│  │                                        │  │
│  │   That's like watching EVERY           │  │
│  │   Marvel movie... 47 times.            │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│               ● ○ ○ ○ ○ ○ ○ ○               │
│                                              │
│            ▼ SWIPE FOR MORE                  │
│                                              │
└──────────────────────────────────────────────┘
```

### New Page Hierarchy (Reduced from 17 to 9 chapters)

```
1. INTRO           - "Your Year in Entertainment"
2. THE BIG NUMBER  - Total watch time (dramatic reveal)
3. TOP 10          - Movies & Shows combined
4. YOUR GENRES     - Genre breakdown with personality
5. VIEWING HABITS  - When/where/how you watch
6. DEEP CUTS       - Oldest/critically acclaimed/hidden gems
7. THE JOURNEY     - Monthly timeline visualization
8. FUN FACTS       - Quirky stats and comparisons
9. THE FINALE      - Year summary + shareable card
```

---

## Component Designs

### 1. Intro/Splash Page - "The Opening Credits"

**Concept**: Film reel aesthetic with dramatic text reveal

```
┌────────────────────────────────────────────────────┐
│                                                    │
│                   ◉                                │
│                  /|\                               │
│                 / | \                              │
│                /  |  \                             │
│               ────────── (spotlight effect)        │
│                                                    │
│                                                    │
│           J E L L Y F I N                          │
│                                                    │
│              W R A P P E D                         │
│                                                    │
│               ─────────                            │
│                 2 0 2 5                            │
│                                                    │
│                                                    │
│     [ ▶ REVEAL YOUR YEAR ]                        │
│                                                    │
│                                                    │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│   (film strip perforations at bottom)              │
└────────────────────────────────────────────────────┘
```

**Animations**:

- Spotlight sweeps across the screen
- Text types in letter-by-letter like movie credits
- Film grain overlay subtly animates
- Star particles drift slowly

### 2. The Big Number - "The Reveal"

**Concept**: Giant animated counter with dramatic comparison

```
┌────────────────────────────────────────────────────┐
│                                                    │
│                   THIS YEAR                        │
│                   YOU WATCHED                      │
│                                                    │
│                                                    │
│         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                    │
│         █                     █                    │
│         █       2,847         █                    │
│         █       H O U R S     █                    │
│         █                     █                    │
│         ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀                    │
│                  ───                               │
│                   │                                │
│                   │                                │
│                   ▼                                │
│                                                    │
│         That's equivalent to:                      │
│                                                    │
│    🎬 118 days straight                            │
│    🌙 365 all-nighters                             │
│    ✈️ 7 flights to Mars                            │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Interactions**:

- Number animates counting up from 0
- Each comparison reveals sequentially
- Confetti burst at reveal completion

### 3. Top 10 Page - "The Winners Circle"

**Concept**: Award show / red carpet aesthetic

```
┌────────────────────────────────────────────────────┐
│                                                    │
│              ✦ YOUR TOP 10 ✦                       │
│                                                    │
│   ┌─────────────────────────────────────────┐     │
│   │                                         │     │
│   │      🏆                                 │     │
│   │     ━━━━━━━━━━━                         │     │
│   │        #1                               │     │
│   │                                         │     │
│   │    ┌─────────────┐                      │     │
│   │    │             │                      │     │
│   │    │   POSTER    │   Breaking Bad       │     │
│   │    │             │   ───────────────    │     │
│   │    │             │   62 episodes        │     │
│   │    └─────────────┘   187 hours          │     │
│   │                                         │     │
│   │   "You couldn't look away. Neither      │     │
│   │    could we."                           │     │
│   │                                         │     │
│   └─────────────────────────────────────────┘     │
│                                                    │
│            ← 2  ●  3 →                             │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Features**:

- Horizontal swipe through top 10
- Each item has a unique quip/description
- Poster reveals with spotlight effect
- Gold trophy badge animates

### 4. Genre Breakdown - "Your Taste Profile"

**Concept**: Dynamic pie chart that explodes into genre sections

```
┌────────────────────────────────────────────────────┐
│                                                    │
│           YOUR TASTE IN 2025                       │
│                                                    │
│                                                    │
│                   ┌───────┐                        │
│                 ╱   SCI-FI  ╲                      │
│              ╱      42%       ╲                    │
│            ╱                    ╲                  │
│           │   DRAMA    COMEDY   │                  │
│           │    28%      18%     │                  │
│            ╲                    ╱                  │
│              ╲    OTHER 12%   ╱                    │
│                 ╲           ╱                      │
│                   └───────┘                        │
│                                                    │
│   ─────────────────────────────────────────────    │
│                                                    │
│   🚀 SCI-FI OBSESSED                               │
│                                                    │
│   "You explored 47 new worlds this year.           │
│    Your top pick: Dune"                            │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Animation**:

- Pie chart animates in segments
- Tapping a segment expands it
- Genre-specific color schemes and icons

### 5. Viewing Habits - "The Patterns"

**Concept**: Sleek, neon-styled activity visualization

```
┌────────────────────────────────────────────────────┐
│                                                    │
│             WHEN DO YOU WATCH?                     │
│                                                    │
│         ┌────────────────────────────┐             │
│         │                            │             │
│         │  SUN  ░░░░░▓▓▓▓░░░░░░░░░░  │             │
│         │  MON  ░░░░░░░░▓▓▓▓░░░░░░░  │             │
│         │  TUE  ░░░░░░░░▓▓▓▓░░░░░░░  │             │
│         │  WED  ░░░░░░░░▓▓▓▓▓▓░░░░░  │             │
│         │  THU  ░░░░░░░░▓▓▓▓▓▓▓▓░░░  │             │
│         │  FRI  ░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓  │ ← FRIDAY   │
│         │  SAT  ░░░░░▓▓▓▓▓▓▓▓▓▓░░░░  │    NIGHT   │
│         │       ─────────────────────│    KING    │
│         │       6am        6pm   12am │             │
│         └────────────────────────────┘             │
│                                                    │
│              ────────────────────                  │
│                                                    │
│   🦉 NIGHT OWL                                     │
│                                                    │
│   72% of your viewing happened after 9 PM          │
│   Peak time: Friday @ 10:47 PM                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 6. The Finale - "Your Shareable Card"

**Concept**: Generate a beautiful, shareable summary card

```
┌────────────────────────────────────────────────────┐
│                                                    │
│            ╔═══════════════════════════╗           │
│            ║                           ║           │
│            ║    JELLYFIN WRAPPED       ║           │
│            ║         2 0 2 5           ║           │
│            ║                           ║           │
│            ║   ┌─────┐                 ║           │
│            ║   │ 📺 │  2,847 HOURS     ║           │
│            ║   └─────┘                 ║           │
│            ║                           ║           │
│            ║   TOP GENRE: SCI-FI       ║           │
│            ║   #1 SHOW: BREAKING BAD   ║           │
│            ║   #1 MOVIE: DUNE          ║           │
│            ║                           ║           │
│            ║   ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰   ║           │
│            ║       TOP 1% VIEWER       ║           │
│            ║                           ║           │
│            ╚═══════════════════════════╝           │
│                                                    │
│        [ 📱 SHARE ]   [ 📸 DOWNLOAD ]              │
│                                                    │
│              "See you next year! 🎬"               │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat colors, use dynamic, atmospheric backgrounds:

#### 1. Aurora Effect (CSS-only)

```css
.aurora-bg {
  background: radial-gradient(
      ellipse at 20% 50%,
      rgba(196, 76, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(78, 205, 196, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 60% 80%,
      rgba(255, 217, 61, 0.1) 0%,
      transparent 50%
    ),
    var(--bg-void);
  animation: aurora 15s ease-in-out infinite alternate;
}

@keyframes aurora {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
}
```

#### 2. Grain Overlay

```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise texture */
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

#### 3. Floating Particles

```typescript
// Use tsparticles or custom canvas for floating embers/stars
const particleConfig = {
  particles: {
    number: { value: 50 },
    size: { value: 2, random: true },
    move: { speed: 0.3, direction: "top" },
    opacity: { value: 0.5, random: true },
  },
};
```

---

## Mobile-First Design

### Touch Gestures

| Gesture    | Action                 |
| ---------- | ---------------------- |
| Swipe Up   | Next slide             |
| Swipe Down | Previous slide         |
| Tap        | Reveal additional info |
| Long Press | Share options          |
| Pinch      | Zoom poster images     |

### Mobile-Specific Layouts

```
┌─────────────────┐
│                 │
│   YOUR TOP      │
│   GENRE         │
│                 │
│   ╭─────────╮   │
│   │         │   │
│   │  SCI-FI │   │
│   │   42%   │   │
│   │         │   │
│   ╰─────────╯   │
│                 │
│   "47 new       │
│    worlds       │
│    explored"    │
│                 │
│   ● ○ ○ ○ ○     │
│                 │
│   SWIPE UP ↑    │
│                 │
└─────────────────┘
```

---

## Sound Design (Optional Enhancement)

Add subtle audio feedback for key moments:

| Event              | Sound          |
| ------------------ | -------------- |
| Page transition    | Soft whoosh    |
| Number reveal      | Counting tick  |
| Achievement unlock | Chime          |
| Confetti           | Pop            |
| Share              | Camera shutter |

```typescript
// Optional: Use Howler.js or native Web Audio API
const sounds = {
  whoosh: new Howl({ src: ["whoosh.mp3"], volume: 0.3 }),
  tick: new Howl({ src: ["tick.mp3"], volume: 0.2 }),
  confetti: new Howl({ src: ["pop.mp3"], volume: 0.4 }),
};
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up new color system and CSS variables
- [ ] Import and configure typography (Clash Display + Space Mono)
- [ ] Create base `<StorySlide>` component
- [ ] Implement page transition animations
- [ ] Build grain/aurora background effects

### Phase 2: Core Slides (Week 3-4)

- [ ] Intro/Splash page redesign
- [ ] Big Number reveal page
- [ ] Top 10 horizontal swipe carousel
- [ ] Genre breakdown with animated chart

### Phase 3: Enhanced Visuals (Week 5-6)

- [ ] Viewing habits heatmap
- [ ] Monthly journey timeline
- [ ] Fun facts with comparisons
- [ ] Shareable card generator

### Phase 4: Polish (Week 7-8)

- [ ] Micro-interactions and hover states
- [ ] Mobile gesture optimization
- [ ] Performance optimization
- [ ] Sound design (optional)
- [ ] Share functionality

---

## Technical Requirements

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-spring/web": "^9.7.0",
    "canvas-confetti": "^1.9.0",
    "@tsparticles/react": "^3.0.0",
    "html-to-image": "^1.11.0",
    "react-swipeable": "^7.0.0"
  }
}
```

### Font Loading

```html
<!-- In index.html -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=space-mono@400,700&display=swap"
  rel="stylesheet"
/>
```

### CSS Custom Properties Structure

```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --color-bg-void: #0a0a0b;
  /* ... all color tokens */

  /* Typography */
  --font-display: "Clash Display", sans-serif;
  --font-mono: "Space Mono", monospace;
  /* ... all type tokens */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  /* ... all spacing tokens */

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  /* ... all animation tokens */
}
```

---

## Comparison: Before & After

### Before (Current)

- 🟡 Generic purple/yellow gradient
- 🟡 System fonts
- 🟡 Basic fade animations
- 🟡 Traditional nav structure
- 🟡 Information-dense layouts
- 🟡 17 separate pages

### After (Proposed)

- 🟢 Cinematic dark theme with neon accents
- 🟢 Custom display typography
- 🟢 Choreographed reveal animations
- 🟢 Story-style vertical flow
- 🟢 Focused, impactful slides
- 🟢 9 chapters with clear narrative

---

## Success Metrics

| Metric                    | Target          |
| ------------------------- | --------------- |
| Time to complete          | < 3 minutes     |
| Screenshot/share rate     | > 30% of users  |
| Return visits             | > 40% come back |
| Mobile completion         | > 80%           |
| "Wow" moments per session | 3-5             |

---

## Inspiration References

1. **Spotify Wrapped** - Story format, bold typography, shareable cards
2. **Apple Music Replay** - Clean, dark aesthetic, smooth animations
3. **YouTube Recap** - Playful personality, data visualizations
4. **Monzo Year in Review** - Engaging financial storytelling
5. **Steam Replay** - Gaming stats with personality
6. **Film Credits** - Typography inspiration, pacing

---

## Conclusion

This overhaul transforms Jellyfin Wrapped from a functional data display into a **memorable annual experience** users will look forward to. By embracing cinematic aesthetics, thoughtful animation choreography, and shareable moments, we can create something that feels genuinely special—worthy of the entertainment it celebrates.

The key insight: **Spotify Wrapped isn't popular because of the data—it's popular because of how the data makes you FEEL.**

Let's make users feel like the star of their own movie premiere.

---

## Appendix A: Component API Specifications

### Core Components

#### `<StorySlide>` - Base wrapper for all chapter slides

```typescript
interface StorySlideProps {
  /** Unique chapter identifier */
  chapterId: string;
  /** Chapter number (1-9) for progress indicator */
  chapterNumber: number;
  /** Background variant */
  background?: "void" | "aurora" | "gradient-gold" | "gradient-hero";
  /** Accent color for this slide */
  accentColor?: "gold" | "coral" | "cyan" | "magenta" | "electric";
  /** Whether to show progress dots */
  showProgress?: boolean;
  /** Whether to show swipe hint */
  showSwipeHint?: boolean;
  /** Content */
  children: React.ReactNode;
  /** Callback when slide becomes active */
  onEnter?: () => void;
  /** Callback when slide exits view */
  onExit?: () => void;
}
```

#### `<AnimatedNumber>` - Counting number reveal

```typescript
interface AnimatedNumberProps {
  /** Target value to count to */
  value: number;
  /** Duration in seconds */
  duration?: number; // default: 2.5
  /** Format function (e.g., add commas) */
  format?: (n: number) => string;
  /** Delay before starting */
  delay?: number;
  /** Size variant */
  size?: "stat" | "hero"; // hero = massive reveal number
  /** Unit label (e.g., "HOURS", "MOVIES") */
  unit?: string;
  /** Trigger confetti on complete */
  confettiOnComplete?: boolean;
}
```

#### `<ComparisonList>` - Sequential reveal comparisons

```typescript
interface ComparisonItem {
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
}
```

#### `<TopTenCarousel>` - Horizontal swipe carousel

```typescript
interface TopTenItem {
  id: string;
  rank: number;
  title: string;
  posterUrl: string;
  stats: string; // e.g., "62 episodes • 187 hours"
  quip: string; // e.g., "You couldn't look away"
  type: "movie" | "show";
}

interface TopTenCarouselProps {
  items: TopTenItem[];
  onItemChange?: (index: number) => void;
}
```

#### `<GenreChart>` - Animated pie chart

```typescript
interface GenreData {
  name: string;
  percentage: number;
  count: number;
  color: string;
  icon: string; // emoji
}

interface GenreChartProps {
  genres: GenreData[];
  topGenre: GenreData;
  /** Personality label (e.g., "SCI-FI OBSESSED") */
  personalityLabel: string;
  /** Flavor text */
  flavorText: string;
}
```

#### `<HeatmapChart>` - Viewing patterns visualization

```typescript
interface ViewingData {
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  intensity: number; // 0-1
}

interface HeatmapChartProps {
  data: ViewingData[];
  /** Derived personality (e.g., "NIGHT OWL") */
  personality: string;
  personalityEmoji: string;
  /** Peak viewing insight */
  peakInsight: string;
}
```

#### `<ShareCard>` - Exportable summary card

```typescript
interface ShareCardProps {
  totalHours: number;
  topGenre: string;
  topShow: string;
  topMovie: string;
  percentile?: number; // e.g., 1 for "TOP 1%"
  year: number;
}

// Export functions
function downloadAsImage(cardRef: RefObject<HTMLDivElement>): Promise<void>;
function shareToClipboard(cardRef: RefObject<HTMLDivElement>): Promise<void>;
```

---

## Appendix B: Page-to-Chapter Migration Map

### Current → New Structure

| Current Page(s)                                                  | New Chapter                  | Data Source                                                | Notes                      |
| ---------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| `SplashPage`                                                     | **1. INTRO**                 | None                                                       | Redesign splash            |
| `LoadingDataPage`                                                | **1. INTRO** (loading state) | API calls                                                  | Show during data fetch     |
| _(new)_                                                          | **2. BIG NUMBER**            | `useTopTen` total time                                     | New page                   |
| `TopTenPage`                                                     | **3. TOP 10**                | `useTopTen`                                                | Redesign as carousel       |
| `GenreReviewPage`                                                | **4. YOUR GENRES**           | `useMovies`, `useShows`                                    | Redesign chart             |
| `PunchCardPage` + `MinutesPlayedPerDayPage` + `DeviceStatsPage`  | **5. VIEWING HABITS**        | `usePunchCard`, `useMinutesPlayedPerDay`, `useDeviceStats` | Combine into tabs/sections |
| `OldestMoviePage` + `OldestShowPage` + `CriticallyAcclaimedPage` | **6. DEEP CUTS**             | `useMovies`, `useShows`                                    | Combine                    |
| `ShowOfTheMonthPage` + `ActivityCalendarPage`                    | **7. THE JOURNEY**           | `useMonthlyShowStats`, `useCalendar`                       | Combine as timeline        |
| _(new)_                                                          | **8. FUN FACTS**             | Derived from all data                                      | New page with comparisons  |
| _(new)_                                                          | **9. THE FINALE**            | Summary of all data                                        | New shareable card page    |

---

## Animation Strategy

### Motion Design Principles

1. **Choreographed Reveals**: Elements enter in orchestrated sequence
2. **Spring Physics**: Natural, bouncy feel (not linear)
3. **Directional Flow**: Content flows top→down, left→right
4. **Micro-interactions**: Hover states, button presses feel tactile
5. **Parallax Depth**: Background elements move at different speeds

### Key Animations

```typescript
// Stagger configuration for list reveals
const staggerConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    staggerChildren: 0.15,
  },
};

// Number counting animation
const countUp = {
  from: 0,
  to: targetValue,
  duration: 2.5,
  ease: "easeOut",
};

// Confetti burst for celebrations
const confettiBurst = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD93D", "#FF6B6B", "#4ECDC4"],
};
```

### Page Transitions

Replace basic fade with cinematic transitions:

```typescript
const pageTransitions = {
  filmWipe: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },

  spotlightReveal: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
      filter: "brightness(0)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
      filter: "brightness(1)",
    },
  },

  verticalSlide: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
};
```

---

## Background Treatments

### Animated Backgrounds

Instead of flat
