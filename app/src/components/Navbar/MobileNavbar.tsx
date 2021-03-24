import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Link, Stack, Text } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import React from 'react'
import { navbarItems, NavItem } from './navbarItems';

export const MobileNavbar = () => {
    return (
        <Stack
          bg={useColorModeValue('gray.300', 'gray.800')}
          p={4}
          display={{ md: 'none' }}>
          {navbarItems.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}
        </Stack>
      );
}

const MobileNavItem = ({ label, children, path }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={path ?? '#'}
          justify={'space-between'}
          align={'center'}
        >
          <Text
            fontWeight={600}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.path}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  