import { Box, Flex } from '@chakra-ui/react';

type Props = {
  data: Array<{
    title: string;
    content: string;
  }>;
};

export const DescriptionList = ({ data }: Props) => {
  return (
    <Flex gap="16">
      {data.map((item) => (
        <Box as="dl" key={item.title}>
          <Box
            as="dt"
            color="blue.600"
            fontSize="sm"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            {item.title}
          </Box>
          <Box as="dd" fontSize="3xl" fontFamily="heading" fontWeight="bold">
            {item.content}
          </Box>
        </Box>
      ))}
    </Flex>
  );
};
