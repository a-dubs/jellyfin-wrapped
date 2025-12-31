import { Container, Grid } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useErrorBoundary } from "react-error-boundary";
import { useMusicVideos } from "@/hooks/queries/useMusicVideos";
import { MovieCard } from "./MoviesReviewPage/MovieCard";
import { LoadingSpinner } from "../LoadingSpinner";
import { Title } from "../ui/styled";
import { itemVariants } from "@/lib/styled-variants";
import PageContainer from "../PageContainer";
import { usePageDataCheck } from "@/hooks/usePageDataCheck";

export default function MusicVideoPage() {
  const { showBoundary } = useErrorBoundary();
  const { data: musicVideos, isLoading, error } = useMusicVideos();

  // Automatically skip this page if no data
  usePageDataCheck({
    data: musicVideos,
    isLoading,
    error,
    isEmpty: (data) => !data || data.length === 0,
  });

  if (error) {
    showBoundary(error);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!musicVideos?.length) {
    return null;
  }

  return (
    <PageContainer backgroundColor="var(--red-8)">
      <Container size="4" p="4">
        <Grid gap="6">
          <div style={{ textAlign: "center" }}>
            <Title as={motion.h1} variants={itemVariants}>
              You Listened to {musicVideos.length} Music Videos
            </Title>
            <p style={{ fontSize: "1.125rem", color: "var(--gray-11)", marginTop: "0.5rem" }}>
              Your music video viewing collection
            </p>
          </div>

          <Grid columns={{ initial: "2", sm: "3", md: "4", lg: "5" }} gap="4">
            {musicVideos.slice(0, 20).map((musicVideo: { id?: string }) => (
              <MovieCard key={musicVideo.id} item={musicVideo} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}
