import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { EmptyState } from '../components/empty-state';
import { Container } from '../components/layout/container';
import { SearchInput } from '../components/search-input';
import { SEO } from '../components/seo/seo';
import { VideoCard } from '../components/video-card';
import { useVideoSearch } from '../lib/hooks/use-video-search';

export default function Page() {
  const search = useVideoSearch();

  const { isReady } = useRouter();
  if (!isReady) return null;

  const displayResultLabel = (total: number) => {
    if (total === 0) {
      return 'No video found';
    }

    if (total === 1) {
      return '1 video found';
    }

    return `${total} videos found`;
  };

  return (
    <Container>
      <SEO title="Videos" />
      <Box py="vGutter">
        <Box>
          <Heading size="3xl" marginBottom="6" as="h1" color="white">
            YouTube Videos
          </Heading>
          <Text fontSize="lg" maxW="560px">
            I frequently publish videos about Electronics, IoT, Embedded Systems and many more
            topics. Most of the content is in French!
          </Text>
        </Box>

        <Box maxWidth="xl" mt="8">
          <SearchInput
            placeholder="Search videos"
            defaultValue={search.defaultValue}
            onChange={(value) => {
              search.setParams(value);
            }}
          />
          <Heading size="md" marginY="2">
            {displayResultLabel(search.results.length)}
          </Heading>
        </Box>

        <Box marginTop="6rem">
          {search.isEmptyResult ? (
            <EmptyState />
          ) : (
            <Flex direction="column" gap="20">
              {search.results.map((video) => (
                <VideoCard key={video.title} data={video} />
              ))}
            </Flex>
          )}
        </Box>
      </Box>
    </Container>
  );
}
