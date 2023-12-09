import {
  Box,
  Center,
  Circle,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Stack,
  StackDivider,
  StackProps,
  Text,
  VisuallyHidden,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ElementType, ReactNode, useEffect } from 'react';

import {
  AboutIcon,
  BlogIcon,
  CloseIcon,
  HamburgerMenuIcon,
  ProjectIcon,
  TalksIcon,
} from '../icons';

type NavItemProps = {
  data: NavItemData;
  active?: boolean;
  children: ReactNode;
  large?: boolean;
};

const NavItem = (props: NavItemProps) => {
  const { children, data, active, large } = props;

  return (
    <HStack
      as={Link}
      href={data.href}
      spacing="2"
      paddingX="3"
      paddingY={large ? '5' : '2.5'}
      rounded="lg"
      aria-current={active ? 'page' : undefined}
      _hover={{ color: 'blue.600' }}
      _activeLink={{ bg: 'gray.800', shadow: 'highlight' }}
    >
      <Icon as={data.icon} color="blue.600" fontSize="lg" />
      <Text fontFamily="heading">{children}</Text>
    </HStack>
  );
};

type NavItemData = {
  label: string;
  href: string;
  icon: ElementType;
  primary?: boolean;
};

const items: NavItemData[] = [
  { href: '/videos', icon: TalksIcon, label: 'Videos' },
  { href: '/blog', icon: BlogIcon, label: 'Blog' },
  { href: '/projects', icon: ProjectIcon, label: 'Projects' },
  {
    href: '/about',
    icon: AboutIcon,
    label: 'About',
    primary: true,
  },
];

const DesktopNavItemGroup = (props: StackProps) => {
  const { asPath } = useRouter();

  return (
    <HStack as="nav" aria-label="Main navigation" spacing="8" {...props}>
      {items.map((item) => (
        <NavItem key={item.label} data={item} active={asPath.startsWith(item.href)}>
          {item.label}
        </NavItem>
      ))}
    </HStack>
  );
};

const MobileNavItemGroup = (props: StackProps) => {
  return (
    <Stack
      divider={<StackDivider borderColor="whiteAlpha.300" />}
      as="nav"
      aria-label="Main navigation"
      spacing="0"
      {...props}
    >
      {items.map((item) => (
        <NavItem key={item.label} data={item} large>
          {item.label}
        </NavItem>
      ))}
    </Stack>
  );
};

const Headshot = () => {
  return (
    <Circle size="10" rounded="full" borderWidth="2px" borderColor="blue.600">
      <Circle rounded="full" overflow="hidden" size="8">
        <VisuallyHidden>Home</VisuallyHidden>
        <Image
          priority
          alt="Fabrice Durand DJIATSA"
          src="/static/images/durand-djiatsa.jpg"
          width={32}
          height={32}
          style={{ objectFit: 'cover' }}
        />
      </Circle>
    </Circle>
  );
};

const MobileNavMenu = () => {
  const menu = useDisclosure();

  const breakpoint = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (menu.isOpen && !breakpoint) {
      menu.onClose();
    }
  }, [breakpoint, menu]);

  return (
    <>
      <Center
        width="10"
        height="10"
        display={{ base: 'flex', md: 'none' }}
        as="button"
        aria-haspopup="true"
        aria-expanded={menu.isOpen}
        aria-controls="nav-menu"
        id="nav-menu--trigger"
        type="button"
        onClick={menu.onOpen}
      >
        {menu.isOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
      </Center>
      <Drawer isOpen={menu.isOpen} onClose={menu.onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent id="nav-menu" bg="gray.800" padding="6">
          <MobileNavItemGroup />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Navbar = () => {
  return (
    <Box as="header" paddingY="6" maxWidth="6xl" marginX="auto" paddingX="6">
      <Flex justify="space-between" align="center">
        <Link href="/">
          <Headshot />
        </Link>
        <DesktopNavItemGroup display={{ base: 'none', md: 'flex' }} />
        <MobileNavMenu />
      </Flex>
    </Box>
  );
};
