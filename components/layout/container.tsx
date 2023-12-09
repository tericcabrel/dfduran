import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

import { Footer } from './footer';
import { Navbar } from './navbar';

type Props = PropsWithChildren<{
  gradient?: React.ReactElement;
}>;

export const Container = ({ children, gradient }: Props) => {
  return (
    <Box>
      <Navbar />
      {gradient}
      <Box maxWidth="6xl" marginX="auto" paddingX="6">
        <Box as="main" id="content" position="relative" zIndex={1}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
