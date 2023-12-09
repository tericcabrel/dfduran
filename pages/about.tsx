import { Box, Heading } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { Container } from 'components/layout/container';
import { MDXComponents } from 'components/mdx-components';
import { SEO } from 'components/seo/seo';
import { About } from 'contentlayer/generated';
import { aboutData } from 'lib/contentlayer-utils';
import { formatDate } from 'lib/format-date';
import { getAbsoluteURL } from 'lib/router-utils';

export default function AboutPage({ about, ogImageUrl }: { about: About; ogImageUrl: string }) {
  const Component = useMDXComponent(about.body.code);
  const date = formatDate(about.publishedAt);

  return (
    <Container>
      <SEO
        image={ogImageUrl}
        title="About me"
        description={about.description}
        post={{ date: date.iso, tags: [] }}
      />
      <Box maxWidth="4xl" marginX="auto" paddingTop="12" paddingBottom="8rem">
        <article>
          <Box marginBottom="6">
            <Heading size="2xl" as="h1" marginBottom="8" color="white">
              About me
            </Heading>
          </Box>

          <Box
            position="relative"
            rounded="lg"
            overflow="hidden"
            marginTop="10"
            marginBottom="16"
            height={[200, 400, 600]}
          >
            <Image src={about.imageTop} alt={about.name} fill priority />
          </Box>

          <Box
            sx={{
              color: 'gray.300',
              lineHeight: 'taller',
              'p + p': {
                marginY: '1.25em',
              },
            }}
          >
            <Component components={MDXComponents} />
          </Box>

          <Box
            position="relative"
            rounded="lg"
            overflow="hidden"
            marginTop="10"
            height={[200, 400, 600]}
          >
            <Image src={about.imageBottom} alt={about.name} fill priority />
          </Box>
        </article>
      </Box>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const searchParams = new URLSearchParams();
  searchParams.set('title', aboutData.name);
  searchParams.set('tags', '');
  searchParams.set('date', formatDate(aboutData.publishedAt).pretty);
  searchParams.set('readingTime', aboutData.readingTime.text);

  const ogImageUrl = getAbsoluteURL(`/api/open-graph-image?${searchParams.toString()}`);

  return { props: { about: aboutData, ogImageUrl } };
};
