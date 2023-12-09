import { Box, Wrap, WrapItem, WrapItemProps, WrapProps } from '@chakra-ui/react';

type Props = {
  spacing?: WrapProps['spacing'];
  data: string[];
  tagProps?: WrapItemProps;
};

export const HashTags = (props: Props) => {
  const { data, spacing, tagProps } = props;

  return (
    <Wrap spacing={spacing}>
      {data.map((item) => (
        <WrapItem key={item} opacity={0.8} userSelect="none" {...tagProps}>
          <Box as="span" color="blue.600">
            #
          </Box>
          <span>{item}</span>
        </WrapItem>
      ))}
    </Wrap>
  );
};
