import { HStack, Icon, SystemProps, Text } from '@chakra-ui/react';
import { ElementType } from 'react';

type Props = {
  icon: ElementType;
  children: string;
  href: string;
  iconColor?: SystemProps['color'];
};

export const LinkItem = (props: Props) => {
  const { icon, children, href, iconColor = 'blue.600' } = props;

  return (
    <HStack as="a" href={href} rel="noopener" target="_blank" spacing="3">
      <Icon aria-hidden as={icon} fontSize="xl" color={iconColor} />
      <Text textDecoration="underline" textDecorationThickness="1px" textUnderlineOffset="3px">
        {children}
      </Text>
    </HStack>
  );
};
