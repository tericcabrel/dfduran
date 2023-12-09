import { AspectRatio, Stack, chakra } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChakraLink = React.forwardRef<HTMLAnchorElement, any>(function ChakraLink(props, ref) {
  return (
    <chakra.a
      ref={ref}
      color="white"
      fontWeight="semibold"
      textDecor="underline"
      textUnderlineOffset="6px"
      textDecorationColor="blue.700"
      _hover={{ bg: 'gray.700' }}
      {...props}
    />
  );
});

const CustomLink = (props: React.AnchorHTMLAttributes<any>) => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return <ChakraLink as={Link} href={href} {...props} />;
  }

  return <ChakraLink target="_blank" rel="noopener noreferrer" {...props} />;
};

export const MDXComponents: Record<string, React.FC<any>> = {
  Image({ ratio, alt, marginY = '6em', fit, caption, ...rest }) {
    if (ratio) {
      return (
        <Stack as="figure" marginY={marginY} spacing="5">
          <AspectRatio ratio={ratio} position="relative">
            <Image
              alt={alt}
              className="img"
              style={{ objectFit: fit, overflow: 'visible' }}
              {...rest}
            />
          </AspectRatio>
          {caption && (
            <chakra.figcaption fontSize="small" textAlign="center" color="gray.400">
              {alt}
            </chakra.figcaption>
          )}
        </Stack>
      );
    }

    return (
      <Stack as="figure" marginY={marginY}>
        <Image alt={alt} className="img" style={{ objectFit: fit }} {...rest} />
        {caption && (
          <chakra.figcaption fontSize="small" textAlign="center" color="gray.400">
            {alt}
          </chakra.figcaption>
        )}
      </Stack>
    );
  },
  a: CustomLink,
  blockquote(props) {
    return (
      <chakra.blockquote
        color="white"
        marginY="8"
        paddingX="6"
        paddingY="4"
        marginX="-6"
        bg="gray.800"
        sx={{ borderColor: 'blue.600', borderLeft: '4px solid' }}
        {...props}
      />
    );
  },
  code(props) {
    if (typeof props.children === 'string') {
      return <chakra.code color="blue.600" rounded="sm">{`\`${props.children}\``}</chakra.code>;
    }

    return <code {...props} />;
  },
  h2(props) {
    return (
      <chakra.h2
        lineHeight="1.5em"
        fontSize="2xl"
        fontFamily="heading"
        fontWeight="semibold"
        marginTop="16"
        marginBottom="4"
        {...props}
      />
    );
  },
  h3(props) {
    return (
      <chakra.h3
        lineHeight="1.5em"
        fontSize="xl"
        fontFamily="heading"
        fontWeight="semibold"
        marginTop="12"
        marginBottom="4"
        {...props}
      />
    );
  },
  hr(props) {
    return <chakra.hr borderColor="whiteAlpha.100" marginY="3em" {...props} />;
  },
  li(props) {
    return <chakra.li marginY="2" sx={{ '&::marker': { color: 'blue.600' } }} {...props} />;
  },
  ol(props) {
    return <chakra.ul paddingStart="4" marginY="5" {...props} />;
  },
  strong(props) {
    return <chakra.strong fontWeight="semibold" color="white" {...props} />;
  },
  table(props) {
    return (
      <chakra.table
        marginY="10"
        width="full"
        sx={{
          borderCollapse: 'collapse',
          tbody: {
            td: {
              padding: '2',
            },
            tr: {
              borderBottomColor: 'gray.800',
              borderBottomWidth: '1px',
            },
          },
          thead: {
            borderBottomColor: 'gray.700',
            borderBottomWidth: '1px',
            th: {
              color: 'gray.200',
              padding: '2',
              textAlign: 'start',
              verticalAlign: 'bottom',
            },
          },
        }}
        {...props}
      />
    );
  },
  ul(props) {
    return <chakra.ul paddingStart="4" marginY="5" {...props} />;
  },
};
