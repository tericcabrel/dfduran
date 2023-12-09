import { Box, HStack, Text, useToken } from '@chakra-ui/react';
import React, { Ref } from 'react';

import { ArrowRightIcon } from './icons';

type Props = {
  as?: React.ElementType;
  href?: string;
  children: React.ReactNode;
};

export const ViewMore = React.forwardRef(function ViewBox(
  { children, as = 'a', href, ...rest }: Props,
  ref: Ref<any>,
) {
  const sageBase = useToken('colors', 'blue.600');

  return (
    <HStack as={as} display="inline-flex" data-group ref={ref} {...rest}>
      <Text fontWeight="bold" color="blue.600">
        {children}
      </Text>
      <Box transform="auto" transition="transform 0.2s" _groupHover={{ translateX: '3px' }}>
        <ArrowRightIcon color={sageBase} />
      </Box>
    </HStack>
  );
});
