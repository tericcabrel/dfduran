import { Box, Circle, Flex, HStack, Heading, Text, chakra } from '@chakra-ui/react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { AuthorProfile } from 'components/author-profile';
import { HashTags } from 'components/hash-tags';
import { BlogIcon, TwitterIcon } from 'components/icons';
import { Container } from 'components/layout/container';
import { LinkItem } from 'components/link-item';
import { MDXComponents } from 'components/mdx-components';
import { SubscribeForm } from 'components/subscribe-form';
import { Blog, allBlogs } from 'contentlayer/generated';
import { isNewsletterEnabled } from 'lib/env';
import { formatDate } from 'lib/format-date';
import { getAbsoluteURL } from 'lib/router-utils';

import { SEO } from '../../components/seo/seo';

export default function BlogPage({ blog, ogImageUrl }: { blog: Blog; ogImageUrl: string }) {
  const Component = useMDXComponent(blog.body.code);
  const date = formatDate(blog.publishedAt);

  return (
    <Container>
      <SEO
        image={ogImageUrl}
        title={blog.title}
        description={blog.description}
        post={{ date: date.iso, tags: blog.tags }}
      />
      <Box maxWidth="4xl" marginX="auto" paddingTop="12" paddingBottom="8rem">
        <article>
          <Box marginBottom="6">
            <Heading size="2xl" as="h1" marginBottom="8" color="white">
              {blog.title}
            </Heading>

            <HashTags data={blog.tags ?? []} />

            <Flex
              direction={{ base: 'column-reverse', md: 'row' }}
              gap="4"
              justify="space-between"
              marginTop={{ base: '4', md: '8' }}
            >
              <HStack spacing="3">
                <Circle overflow="hidden">
                  <Image
                    alt="Fabrice Durand DJIATSA"
                    src="/static/images/durand-djiatsa.jpg"
                    width={32}
                    height={32}
                  />
                </Circle>
                <Text fontWeight="medium">Fabrice Durand DJIATSA</Text>
              </HStack>

              <HStack color="blue.600">
                <chakra.span>{blog.readingTime.text}</chakra.span>
                <span aria-hidden>•</span>
                <time dateTime={date.iso}>{date.pretty}</time>
              </HStack>
            </Flex>
          </Box>

          <Box
            position="relative"
            height="400px"
            rounded="lg"
            overflow="hidden"
            marginTop="10"
            marginBottom="16"
          >
            <Image src={blog.image} alt={blog.title} fill style={{ objectFit: 'cover' }} priority />
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
        </article>

        <Flex justify="space-between" my="20">
          <LinkItem href={blog.tweetUrl} icon={TwitterIcon}>
            Tweet this article
          </LinkItem>
          <LinkItem href={blog.editUrl} icon={BlogIcon}>
            Edit on github
          </LinkItem>
        </Flex>

        {isNewsletterEnabled && <SubscribeForm />}

        <AuthorProfile />
      </Box>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: allBlogs.map((blog) => ({ params: { slug: blog.slug } })),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = allBlogs.find((blog) => blog.slug === params?.slug);

  const searchParams = new URLSearchParams();
  searchParams.set('title', blog?.title ?? 'Blog post');
  searchParams.set('tags', (blog?.tags ?? []).join(','));
  searchParams.set('date', formatDate(blog?.publishedAt ?? new Date().toString()).pretty);
  searchParams.set('readingTime', blog?.readingTime.text);
  const ogImageUrl = getAbsoluteURL(`/api/open-graph-image?${searchParams.toString()}`);

  return { props: { blog, ogImageUrl } };
};
