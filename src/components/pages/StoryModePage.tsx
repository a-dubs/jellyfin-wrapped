import { useState } from "react";
import { StoryContainer } from "../story";
import {
  IntroChapter,
  BigNumberChapter,
  TopTenChapter,
  GenresChapter,
} from "../chapters";
import { useChapterData } from "@/hooks/story/useChapterData";
import { LoadingSpinner } from "../LoadingSpinner";

const TOTAL_CHAPTERS = 4; // For now, we have 4 chapters

export const StoryModePage = () => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const { totalMinutes, isLoading } = useChapterData();
  const year = new Date().getFullYear();

  const handleStart = () => {
    setCurrentChapter(2); // Move to Big Number chapter
  };

  const handleChapterChange = (chapter: number) => {
    setCurrentChapter(chapter);
  };

  if (isLoading && currentChapter > 1) {
    return <LoadingSpinner />;
  }

  return (
    <StoryContainer
      totalChapters={TOTAL_CHAPTERS}
      onChapterChange={handleChapterChange}
      currentChapter={currentChapter}
    >
      <IntroChapter
        year={year}
        onStart={handleStart}
        isActive={currentChapter === 1}
      />
      <BigNumberChapter
        totalMinutes={totalMinutes}
        isActive={currentChapter === 2}
      />
      <TopTenChapter isActive={currentChapter === 3} />
      <GenresChapter isActive={currentChapter === 4} />
    </StoryContainer>
  );
};

export default StoryModePage;
