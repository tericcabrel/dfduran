import { extendTheme } from '@chakra-ui/react';

const colors = {
  blue: {
    100: '#C4F1F9',
    200: '#9DECF9',
    300: '#76E4F7',
    400: '#0BC5EA',
    50: '#EDFDFD',
    500: '#00B5D8',
    600: '#00A3C4',
    700: '#0987A0',
    800: '#086F83',
    900: '#065666',
  },
  brown: {
    100: 'hsl(30, 52.5%, 94.6%)',
    200: 'hsl(30, 53.0%, 91.2%)',
    300: 'hsl(29, 52.9%, 86.8%)',
    400: 'hsl(29, 52.5%, 80.9%)',
    50: 'hsl(30, 50.0%, 97.6%)',
    500: 'hsl(29, 51.5%, 72.8%)',
    600: 'hsl(28, 50.0%, 63.1%)',
    700: 'hsl(28, 34.0%, 51.0%)',
    800: 'hsl(27, 31.8%, 47.6%)',
    900: 'hsl(25, 30.0%, 41.0%)',
  },
  gray: {
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    50: '#fafaf9',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
};

const fonts = {
  body: 'Inter, -apple-system, system-ui, sans-serif',
  heading: 'PolySans, -apple-system, system-ui, sans-serif',
  mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
};

const theme = {
  colors,
  fonts,
  shadows: {
    highlight: 'inset 0 2px 0 0 rgb(255 255 255 / 5%)',
  },
  space: {
    vGutter: '6.25rem',
  },
  styles: {
    global: {
      '*:focus, *[data-focus]': {
        outline: '2px solid',
        outlineColor: 'blue.400',
        outlineOffset: '3px',
      },
      '.img': {
        rounded: 'lg',
      },
      'a.anchor': {
        '&:before': {
          color: 'blue.600',
          content: `"#"`,
        },
        '&:focus': {
          opacity: 1,
        },
        marginX: '3',
        opacity: 0,
      },
      'h2,h3,h4': {
        '&:hover': {
          'a.anchor': {
            opacity: 1,
          },
        },
        scrollMarginTop: '4rem',
      },
      'html, body': {
        bg: 'gray.900',
        color: 'gray.300',
        colorScheme: 'dark',
        minH: '100vh',
        overflowX: 'hidden',
      },
    },
  },
};

export default extendTheme(theme);
