import { Box, Text } from '@chakra-ui/react';

export const EmptyState = () => {
  return (
    <Box paddingY="5">
      <Text>No results found that match your query. Sorry</Text>
    </Box>
  );
};
