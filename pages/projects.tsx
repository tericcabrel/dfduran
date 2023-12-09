import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import { Container } from 'components/layout/container';
import { MDXComponents } from 'components/mdx-components';
import { ProjectCard } from 'components/project-card';
import { SEO } from 'components/seo/seo';
import { allProjects } from 'contentlayer/generated';
import { siteConfig } from 'site.config';

export default function ProjectPage() {
  return (
    <Container>
      <SEO title="Projects" />
      <Box py="vGutter">
        <Box>
          <Heading as="h1" size="3xl" marginBottom="6" color="white">
            Projects
          </Heading>
          <Stack fontSize="lg" maxW="60ch" spacing="4">
            <Text>
              My primary focus these days is{' '}
              <MDXComponents.a href={siteConfig.profiles.youtube} target="_blank" rel="noopener">
                the YouTube channel{' '}
              </MDXComponents.a>{' '}
              where I publish videos tutorials about Electronics, Embedded Systems, IoT and Computer
              Vision to help others.
            </Text>
            <Text>
              I passionate about what I'm doing and <b>taking fun building projects</b> to learn a
              new skill or sharpen my knowledge by solving a problem encountered by people in
              day-to-day life.
            </Text>
            <Text>Here are some projects I've worked on that I think are worth mentioning.</Text>
          </Stack>
        </Box>

        <Box marginTop="vGutter">
          <Stack spacing="20">
            {allProjects.map((project) => (
              <ProjectCard key={project.title} data={project} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
