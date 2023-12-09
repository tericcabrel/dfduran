import {
  Badge,
  Box,
  Card,
  CardBody,
  Circle,
  Flex,
  HStack,
  Heading,
  HeadingProps,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { Emoji } from 'components/emoji';
import { EmailIcon, GithubIcon, LinkedInIcon, TwitterIcon, YouTubeIcon } from 'components/icons';
import { LinkItem } from 'components/link-item';
import { ProjectCard } from 'components/project-card';
import { SubscribeForm } from 'components/subscribe-form';
import { VideoCard } from 'components/video-card';
import { ViewMore } from 'components/view-more';
import {
  allFeaturedProjects,
  allFeaturedVideos,
  allGraduations,
  allTechStacks,
} from 'lib/contentlayer-utils';
import { isNewsletterEnabled } from 'lib/env';
import { siteConfig } from 'site.config';

import { Container } from '../components/layout/container';

type AchievementItemProps = PropsWithChildren<{
  icon: React.FC;
}>;

type TimelineStepProps = {
  date: string;
  description: React.ReactNode;
  school: string;
  title: string;
};

const AchievementItem = ({ icon, children }: AchievementItemProps) => {
  return (
    <HStack spacing="3">
      <Icon as={icon} fontSize="4xl" />
      <Text fontFamily="heading" fontSize="xl">
        {children}
      </Text>
    </HStack>
  );
};

const MainHeading = (props: HeadingProps) => {
  return (
    <Heading
      as="h1"
      width="full"
      fontFamily="heading"
      fontSize={{ base: '4rem', md: '6rem' }}
      letterSpacing="tight"
      lineHeight="1"
      userSelect="none"
      color="white"
      marginBottom="4"
      {...props}
    />
  );
};

const TimelineStep = ({ date, title, description, school }: TimelineStepProps) => {
  return (
    <Card color="gray.300" backgroundColor="none" variant="unstyled">
      <CardBody>
        <Badge variant="solid" backgroundColor="blue.600" rounded={4} textTransform="capitalize">
          <Text fontSize="sm" fontWeight="bold" paddingX={2}>
            {date}
          </Text>
        </Badge>
        <Heading size="md" paddingY={2}>
          {title}
        </Heading>
        <Heading size="sm" color="blue.600" paddingY={2}>
          {school}
        </Heading>
        <Text>{description}</Text>
      </CardBody>
    </Card>
  );
};

export default function HomePage() {
  return (
    <Container>
      {/* Fabrice Durand DJIATSA - Engineer in Numerical Systems and Embedded  */}
      <Flex direction="column" paddingY="24">
        <MainHeading>Fabrice Durand DJIATSA</MainHeading>
        <Text
          color="blue.600"
          display="block"
          fontSize="5xl"
          fontFamily="heading"
          fontWeight="bold"
          lineHeight="1.2"
        >
          Engineer in Numerical Systems and Embedded
        </Text>

        {/* I'm passionate about... */}
        <Text
          marginTop="14"
          fontFamily="body"
          maxWidth="40rem"
          fontSize={{ base: 'lg', md: '2xl' }}
        >
          I'm passionate about IoT <Emoji label="design system">🛜</Emoji>, Embedded Systems{' '}
          <Emoji label="accessibility">📟</Emoji>, Computer Vision{' '}
          <Emoji label="state machine">💻👀</Emoji>, and Artificial Intelligence{' '}
          <Emoji label="love">🤖</Emoji>
        </Text>

        {/* YouTube and GitHub */}
        <Box marginTop={{ base: '8', md: '14' }} width="full">
          <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '5', md: '10' }}>
            <AchievementItem icon={YouTubeIcon}>Content Creator</AchievementItem>
            <AchievementItem icon={GithubIcon}>IoT Enthusiast</AchievementItem>
          </Flex>
        </Box>
      </Flex>

      {/* What I do... */}
      <Flex
        paddingY="vGutter"
        gap={{ base: '5', lg: '20' }}
        justify="space-between"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box maxWidth={{ lg: '36rem' }}>
          <Circle
            display={{ base: 'none', lg: 'flex' }}
            position={'relative'}
            size="6.25rem"
            float="left"
            marginRight="6"
            overflow="hidden"
          >
            <Image
              alt="Fabrice Durand DJIATSA"
              src="/static/images/durand-djiatsa.jpg"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Circle>

          <Heading
            lineHeight="1"
            fontSize={{ base: '3rem', lg: '6.25rem', md: '5rem' }}
            letterSpacing="tight"
          >
            I build{' '}
            <Box as="span" color="blue.600">
              intelligent systems
            </Box>
          </Heading>
        </Box>

        <Box maxWidth={{ lg: '27.5rem' }} marginTop="4">
          <Text fontSize={{ base: 'lg', md: '2xl' }} textAlign="justify">
            An engineer with a strong IoT and embedded systems background, specializing in
            architecture's design and the development of smart solutions in many activity's areas.
          </Text>

          {/* Profile links */}
          <SimpleGrid columns={2} marginTop="10" spacing="10" maxWidth="16rem">
            <LinkItem icon={YouTubeIcon} href={siteConfig.profiles.youtube}>
              YouTube
            </LinkItem>
            <LinkItem icon={LinkedInIcon} href={siteConfig.profiles.linkedin}>
              LinkedIn
            </LinkItem>
            <LinkItem icon={TwitterIcon} href={siteConfig.profiles.twitter}>
              Twitter
            </LinkItem>
            <LinkItem icon={EmailIcon} href={siteConfig.profiles.email}>
              Email
            </LinkItem>
          </SimpleGrid>
        </Box>
      </Flex>

      {/* School Background */}
      <Box as="section" aria-labelledby="heading" py="vGutter">
        <Heading size="3xl" letterSpacing="tight">
          My School Background
        </Heading>
        <VStack spacing={10} marginTop="vGutter" align="stretch">
          {allGraduations.map((graduation) => (
            <TimelineStep
              key={graduation.date}
              date={graduation.date}
              title={graduation.title}
              description={graduation.description}
              school={graduation.school}
            />
          ))}
        </VStack>
      </Box>

      {/* Featured projects */}
      <Box as="section" py="vGutter">
        <Heading size="3xl" letterSpacing="tight">
          Featured Projects
        </Heading>
        <Box marginTop="vGutter">
          <Stack spacing="20">
            {allFeaturedProjects.map((project) => (
              <ProjectCard key={project.title} data={project} />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Featured Videos */}
      <Box as="section" py="vGutter" position="relative">
        <Heading size="3xl" letterSpacing="tight" position="relative">
          Featured Videos
        </Heading>
        <Box marginTop="20" marginBottom="10">
          <Flex direction="column" gap="20">
            {allFeaturedVideos.map((video) => (
              <VideoCard key={video.id} data={video} />
            ))}
          </Flex>
        </Box>

        <Link href="/videos">
          <ViewMore as="div">View all Videos</ViewMore>
        </Link>
      </Box>

      {/* Tools & Softwares */}
      <Box as="section" py="vGutter">
        <Box marginBottom="16">
          <Heading size="3xl" letterSpacing="tight">
            Tools &amp; Softwares
          </Heading>
          <Text marginTop="5" fontSize="lg" maxWidth={{ md: '45rem' }}>
            Over the years, I had the opportunity to work with various software, tools and
            frameworks. Here are some of them:
          </Text>
        </Box>

        <Wrap spacing="10">
          {allTechStacks.map((techStack) => (
            <WrapItem fontFamily="heading" fontSize="3xl" color="blue.600" key={techStack}>
              {techStack}
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      {/* Subscribe callout */}
      {isNewsletterEnabled && (
        <>
          <Box as="hr" borderColor="whiteAlpha.300" />
          <SubscribeForm />
          <Box as="hr" borderColor="whiteAlpha.300" />
        </>
      )}
    </Container>
  );
}
