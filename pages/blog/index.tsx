import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { BlogCard } from 'components/blog-card';
import { FeaturedBlogCard } from 'components/featured-blog-card';
import { Container } from 'components/layout/container';
import { SearchInput } from 'components/search-input';
import { SEO } from 'components/seo/seo';
import { TagCheckboxGroup } from 'components/tag-checkbox-group';
import { allFeaturedBlogs } from 'lib/contentlayer-utils';
import { useBlogSearch } from 'lib/hooks/use-blog-search';

export default function Page() {
  const search = useBlogSearch();

  const { isReady } = useRouter();
  if (!isReady) return null;

  const handleTagCheckboxChange = (details: { checked: boolean; value: string }) => {
    const { checked, value } = details;

    if (checked) {
      search.addTag(value);

      return;
    }

    search.removeTag(value);
  };

  return (
    <Container>
      <SEO title="Blog" />
      <Box py="vGutter">
        <Box>
          <Heading size="3xl" marginBottom="6" as="h1" color="white">
            Blog
          </Heading>
          <Text fontSize="lg" maxW="560px">
            Here's a list of articles, thoughts and ideas around topics like embedded systems,
            electronic, IoT, intelligent systems and lots more.
          </Text>
        </Box>

        <Box maxWidth="xl" mt="8">
          <SearchInput
            placeholder="Search blog"
            defaultValue={search.defaultValue}
            onChange={(value) => {
              search.setParams(value);
            }}
          />
        </Box>

        <TagCheckboxGroup
          marginTop="5"
          data={search.tags}
          isChecked={(item) => search.filters.includes(item)}
          onChange={handleTagCheckboxChange}
        />

        <Box marginTop="6rem">
          {search.hasFilter || search.hasQuery ? null : (
            <FeaturedBlogCard data={allFeaturedBlogs[0]} />
          )}
          <SimpleGrid columns={{ base: 1, md: 3 }} mt="4rem" spacing="10">
            {search.results.map((blog) => (
              <BlogCard key={blog.title} data={blog} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Container>
  );
}
