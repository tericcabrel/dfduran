import {
  Badge,
  Box,
  DarkMode,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { VideoItem } from 'contentlayer/generated';
import { formatPublishDate, formatYouTubeDuration } from 'lib/format-date';
import { truncateText } from 'lib/string-utils';

type VideoCardProps = {
  data: VideoItem;
};

type VideoCoverImageProps = {
  src: string;
  alt: string;
};

const VideoCoverImage = (props: VideoCoverImageProps) => {
  const { src, alt } = props;

  return (
    <Box position="relative" rounded="lg" overflow="hidden" width="18.75rem" height="10.5rem">
      <Image alt={alt} src={src} fill style={{ objectFit: 'cover' }} priority />
    </Box>
  );
};

const HoverEffect = () => {
  return (
    <Box
      zIndex={0}
      as="span"
      bg="gray.800"
      position="absolute"
      borderRadius={{ md: '2xl' }}
      insetX="-1.5rem"
      insetY="-1.5rem"
      transform="auto"
      scale="0.9"
      opacity="0"
      transition="0.15s cubic-bezier(.4,0,.2,1)"
      _groupHover={{
        opacity: 1,
        scale: '1',
      }}
    />
  );
};

export const VideoCard = (props: VideoCardProps) => {
  const { data: video } = props;

  const url = `https://www.youtube.com/watch?v=${video.id}`;
  const title = video.localized.title ?? video.title;
  const description = video.localized.description ?? video.description;

  return (
    <LinkBox
      position="relative"
      display="flex"
      data-group
      gap="2rem"
      flexDirection={{ base: 'column', md: 'row' }}
      transition="background 0.1s ease-in-out"
    >
      <HoverEffect />
      <Box>
        <VideoCoverImage src={video.thumbnail.url} alt={title} />
      </Box>

      <Stack spacing="4" marginTop="2" zIndex="1">
        <Heading as="h3" size="lg">
          <LinkOverlay as={Link} href={url} isExternal>
            {title}
          </LinkOverlay>
        </Heading>

        <Text maxWidth={{ md: '37.5rem' }}>{truncateText(description)}</Text>

        <HStack spacing="10" justifyContent="space-between">
          <Box minW="xs" display="flex" justifyContent="space-between">
            <Text
              as="span"
              casing="uppercase"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="wider"
            >
              <Box as="span" color="blue.600" marginRight="2">
                Duration:
              </Box>
              {formatYouTubeDuration(video.duration)}
            </Text>
            <DarkMode>
              <Badge color="blue.600" colorScheme="blue">
                <Box display="flex">{video.viewCount} views</Box>
              </Badge>
            </DarkMode>
          </Box>
          <Box>{formatPublishDate(video.publishedAt)}</Box>
        </HStack>
      </Stack>
    </LinkBox>
  );
};
