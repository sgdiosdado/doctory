import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Stack, Text } from '@chakra-ui/layout';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import React from 'react'
import { navbarItems, NavItem } from './navbarItems';

export const DesktopNavbar = ():JSX.Element => {
  return <>
    <Stack direction={'row'} spacing={4}>
      {navbarItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.path ?? '#'}
                fontSize={'sm'}
                fontWeight={600}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                // bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  </>
}


const DesktopSubNav = ({ label, path, subLabel }: NavItem) => {
  return (
    <Link
      href={path}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      color={useColorModeValue('blue.800', 'white')}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: useColorModeValue('blue.400', 'blue.300')}}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

