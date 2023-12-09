import { Box, HStack, Heading, Text } from '@chakra-ui/react';

import { siteConfig } from 'site.config';

import { EmailIcon, GithubIcon, LinkedInIcon, YouTubeIcon } from '../icons';
import { LinkItem } from '../link-item';
import { MDXComponents } from '../mdx-components';

export const Footer = () => {
  return (
    <Box as="footer" position="relative" paddingY="20">
      <Box maxWidth="6xl" marginX="auto" paddingX="6">
        <Box>
          <Heading marginBottom="6" size="lg">
            Fabrice Durand DJIATSA
          </Heading>
          <Text fontSize="lg">
            Engineer in Numerical Systems and Embedded looking to a build smarter world.
          </Text>
        </Box>

        <HStack marginTop="9" spacing={{ base: '8', md: '10' }}>
          <LinkItem href={siteConfig.profiles.youtube} icon={YouTubeIcon}>
            YouTube
          </LinkItem>
          <LinkItem href={siteConfig.profiles.linkedin} icon={LinkedInIcon}>
            LinkedIn
          </LinkItem>
          <LinkItem href={siteConfig.profiles.github} icon={GithubIcon}>
            GitHub
          </LinkItem>
          <LinkItem href={siteConfig.profiles.email} icon={EmailIcon}>
            Email
          </LinkItem>
        </HStack>

        <Text marginTop="20" opacity="0.7">
          All rights reserved &copy; Fabrice Durand DJIATSA {new Date().getFullYear()}
        </Text>
        <Text marginTop="2" opacity="0.7" fontSize="sm">
          Inspired by{' '}
          <MDXComponents.a href="https://www.adebayosegun.com" target="_blank" rel="noopener">
            adebayosegun.com
          </MDXComponents.a>
        </Text>
      </Box>
    </Box>
  );
};
