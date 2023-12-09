import { Box, Flex, HStack, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { Blog } from 'contentlayer/generated';
import { formatDate } from 'lib/format-date';

import { ViewMore } from './view-more';

type Field = 'publishedAt' | 'readingTime' | 'description' | 'title' | 'image' | 'slug';

type Props = {
  data: Pick<Blog, Field> | null;
};

export const FeaturedBlogCard = (props: Props) => {
  const { data } = props;

  if (!data) return null;

  const { title, description, publishedAt, image, readingTime, slug } = data;
  const date = formatDate(publishedAt);

  return (
    <LinkBox
      display="flex"
      gap="12"
      data-group
      padding={{ base: '6', md: '10' }}
      bg="gray.800"
      rounded="xl"
      shadow="highlight"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Box
        width="full"
        maxWidth="320px"
        height="210px"
        rounded="lg"
        overflow="hidden"
        position="relative"
      >
        <Image
          src={image}
          alt={title}
          width={320}
          height={210}
          priority
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box flex="1">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ md: 'center' }}
          gap={{ base: '2', md: '5' }}
          fontSize="sm"
        >
          <Text fontWeight="semibold">🌟 Featured article</Text>
          <HStack spacing="2" color="blue.600">
            <Box as="time" dateTime={date.iso}>
              {date.pretty}
            </Box>
            <span>•</span>
            <Box>{readingTime.text}</Box>
          </HStack>
        </Flex>

        <Box>
          <Heading size="lg" fontWeight="semibold" marginTop="6">
            {title}
          </Heading>

          <Text marginTop="4" marginBottom="8">
            {description}
          </Text>

          <LinkOverlay as={Link} href={`/blog/${slug}`}>
            <ViewMore as="div">Read the article</ViewMore>
          </LinkOverlay>
        </Box>
      </Box>
    </LinkBox>
  );
};
