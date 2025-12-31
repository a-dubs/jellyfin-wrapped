import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { StoryContainer } from "../story";
import { StorySlide } from "../story";
import {
  IntroChapter,
  BigNumberChapter,
  TopTenChapter,
  GenresChapter,
  HabitsChapter,
  DeepCutsChapter,
  JourneyChapter,
  FunFactsChapter,
  FinaleChapter,
} from "../chapters";
import { useChapterData } from "@/hooks/story/useChapterData";
import { getActiveChapters } from "@/lib/chapter-config";

export const StoryModePage = () => {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(1);
  const chapterData = useChapterData();
  const year = new Date().getFullYear();

  // Get active chapters based on data availability
  const activeChapters = useMemo(
    () => getActiveChapters(chapterData),
    [chapterData]
  );

  const handleStart = useCallback(() => {
    // Find the first active chapter after intro
    const nextChapter = activeChapters.find((c) => c.id !== "intro");
    if (nextChapter) {
      const nextIndex = activeChapters.findIndex(
        (c) => c.id === nextChapter.id
      );
      setCurrentChapter(nextIndex + 1);
    }
  }, [activeChapters]);

  const handleChapterChange = (chapter: number) => {
    setCurrentChapter(chapter);
  };

  // Map chapter IDs to their components
  const chapterComponents = useMemo((): JSX.Element[] => {
    const components: JSX.Element[] = [];

    activeChapters.forEach((chapterConfig, index) => {
      const isActive = currentChapter === index + 1;

      switch (chapterConfig.id) {
        case "intro":
          components.push(
            <IntroChapter
              key="intro"
              year={year}
              onStart={handleStart}
              isActive={isActive}
            />
          );
          break;
        case "big-number":
          components.push(
            <BigNumberChapter
              key="big-number"
              totalMinutes={chapterData.totalMinutes}
              isActive={isActive}
            />
          );
          break;
        case "top-ten":
          components.push(<TopTenChapter key="top-ten" isActive={isActive} />);
          break;
        case "genres":
          components.push(<GenresChapter key="genres" isActive={isActive} />);
          break;
        case "habits":
          components.push(<HabitsChapter key="habits" isActive={isActive} />);
          break;
        case "deep-cuts":
          components.push(
            <DeepCutsChapter key="deep-cuts" isActive={isActive} />
          );
          break;
        case "journey":
          components.push(<JourneyChapter key="journey" isActive={isActive} />);
          break;
        case "fun-facts":
          components.push(
            <FunFactsChapter key="fun-facts" isActive={isActive} />
          );
          break;
        case "finale":
          components.push(<FinaleChapter key="finale" isActive={isActive} />);
          break;
        default:
          // Log skipped chapters for debugging
          console.log(`Chapter "${chapterConfig.id}" not yet implemented`);
          break;
      }
    });

    return components;
  }, [
    activeChapters,
    currentChapter,
    chapterData.totalMinutes,
    year,
    handleStart,
  ]);

  // Handle "no data" scenario - show special message
  if (
    !chapterData.isLoading &&
    chapterData.totalMinutes === 0 &&
    !chapterData.hasMovies &&
    !chapterData.hasShows
  ) {
    return (
      <StorySlide
        chapterId="no-data"
        chapterNumber={1}
        background="gradient-hero"
        accentColor="gold"
        isActive={true}
      >
        <div style={{ textAlign: "center", padding: "var(--space-2xl)" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-title)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Your Story Awaits
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-body)",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-xl)",
              maxWidth: "500px",
              margin: "0 auto var(--space-xl)",
            }}
          >
            We don't have enough viewing data yet. Start watching and come back
            later!
          </p>
          <button
            onClick={() => {
              void navigate("/");
            }}
            style={{
              padding: "var(--space-md) var(--space-xl)",
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-coral) 100%)",
              color: "var(--bg-void)",
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-body)",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Return Home
          </button>
        </div>
      </StorySlide>
    );
  }

  return (
    <StoryContainer
      totalChapters={activeChapters.length}
      onChapterChange={handleChapterChange}
      currentChapter={currentChapter}
    >
      {chapterComponents}
    </StoryContainer>
  );
};

export default StoryModePage;
