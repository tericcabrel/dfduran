import { Box, Circle, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

export const AuthorProfile = () => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '8' }}>
      <Circle size="80px" overflow="hidden">
        <Image
          alt="Fabrice Durand DJIATSA"
          src="/static/images/durand-djiatsa.jpg"
          width={80}
          height={80}
        />
      </Circle>
      <Box>
        <Heading size="md">Written by Fabrice Durand DJIATSA</Heading>
        <Text mt="4" lineHeight="taller">
          Fabrice Durand is passionate about IoT, Embedded Systems, Computer Vision and Artificial
          Intelligence. He enjoy sharing his knowledge on YouTube and working in exciting projects.
        </Text>
      </Box>
    </Flex>
  );
};
