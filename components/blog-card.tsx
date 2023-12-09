import { Box, HStack, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { Blog } from 'contentlayer/generated';
import { formatDate } from 'lib/format-date';

type Field = 'publishedAt' | 'readingTime' | 'description' | 'title' | 'image' | 'slug';

type Props = {
  data: Pick<Blog, Field>;
};

export const BlogCard = (props: Props) => {
  const { data } = props;
  const { title, publishedAt, image, readingTime, slug } = data;
  const date = formatDate(publishedAt);

  return (
    <LinkBox>
      <Box height="210px" rounded="lg" overflow="hidden" position="relative">
        <Image src={image} alt={title} width={340} height={210} style={{ objectFit: 'cover' }} />
      </Box>

      <Box flex="1" mt="5">
        <HStack spacing="5" fontSize="sm">
          <HStack spacing="2" color="blue.600">
            <Box as="time" dateTime={date.iso}>
              {date.pretty}
            </Box>
            <span aria-hidden>•</span>
            <Box>{readingTime.text}</Box>
          </HStack>
        </HStack>

        <Heading size="lg" fontWeight="semibold" marginY="4">
          <LinkOverlay as={Link} href={`/blog/${slug}`}>
            {title}
          </LinkOverlay>
        </Heading>
      </Box>
    </LinkBox>
  );
};
