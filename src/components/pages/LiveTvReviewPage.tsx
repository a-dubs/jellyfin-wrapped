import {
  Container,
  Grid,
  Card,
  Text,
  Flex,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useErrorBoundary } from "react-error-boundary";
import { useLiveTvChannels } from "@/hooks/queries/useLiveTvChannels";
import { LoadingSpinner } from "../LoadingSpinner";
import { formatDuration } from "@/lib/utils";
import { Title } from "../ui/styled";
import PageContainer from "../PageContainer";
import { usePageDataCheck } from "@/hooks/usePageDataCheck";

function ChannelCard({
  channelName,
  duration,
}: {
  channelName: string;
  duration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card size="2">
        <Flex direction="column" gap="2">
          <Text size="5" weight="bold">
            {channelName}
          </Text>
          <Text size="2" color="gray">
            Watch time: {formatDuration(duration)}
          </Text>
        </Flex>
      </Card>
    </motion.div>
  );
}

export default function LiveTvReviewPage() {
  const { showBoundary } = useErrorBoundary();
  const { data: channels, isLoading, error } = useLiveTvChannels();

  const sortedChannels = [...(channels ?? [])].sort(
    (a: { duration: number }, b: { duration: number }) =>
      b.duration - a.duration
  );

  // Automatically skip this page if no data
  usePageDataCheck({
    data: sortedChannels,
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

  if (!sortedChannels.length) {
    return null;
  }

  return (
    <PageContainer backgroundColor="var(--blue-8)">
      <Container size="4" p="4">
        <Grid gap="6">
          <div style={{ textAlign: "center" }}>
            <Title as={motion.h1}>
              You Watched {sortedChannels.length} Live TV Channels
            </Title>
            <p style={{ fontSize: "1.125rem", color: "var(--gray-11)", marginTop: "0.5rem" }}>
              Your live television viewing across different channels
            </p>
          </div>

          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
            {sortedChannels.map(
              (channel: { channelName: string; duration: number }) => (
                <ChannelCard
                  key={channel.channelName}
                  channelName={channel.channelName}
                  duration={channel.duration}
                />
              )
            )}
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}
