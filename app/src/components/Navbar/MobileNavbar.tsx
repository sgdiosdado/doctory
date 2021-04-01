import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import React from 'react'
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../theme/ColorModeSwitcher';
import { navbarItems, NavItem } from './navbarItems';

type mobileNavbarProps = {
  closeNavbar: any
}

export const MobileNavbar = ({closeNavbar} : mobileNavbarProps) => {
    return (
        <Stack
          bg={useColorModeValue('primary.50', 'primary.900')}
          py={4}
          display={{ md: 'none' }}>
          {navbarItems.map((navItem) => (
            <div key={navItem.label} onClick={closeNavbar} >
              <MobileNavItem  {...navItem} />
            </div>
          ))}
          <span onClick={closeNavbar}><ColorModeSwitcher label='Cambiar tema'/></span>
        </Stack>
      );
}

const MobileNavItem = ({ label, children, path }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Link to={path ?? '/'}>
          <Flex
            py={2}
            px={4}
            justify={'space-between'}
            align={'center'}
            _hover={{background: useColorModeValue('primary.100', 'primary.800')}}
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
        </Link>
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} to={child.path ?? '/'}>
                  <ChakraLink as='span' py={2}>
                    {child.label}
                  </ChakraLink>
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  