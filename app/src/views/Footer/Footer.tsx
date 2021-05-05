import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import { routes } from '../../routes/routes'
import { useColorModeValue } from '@chakra-ui/color-mode'

export const Footer = () => {
  return (
    <Box as="footer" py="5" borderTop='1px solid' borderColor={useColorModeValue('gray.300', 'gray.700')}>
      <Flex
        direction={{base: 'column', md: 'row'}}
        maxW={{base: 'xl', md: '7xl'}}
        mx="auto"
        px={{base: '6', md: '8'}}
        align="center"
        justifyContent='center'
      >
        <Stack
          my={{base: '3', md: 0}}
          direction={{base: 'column', md: 'row'}}
          marginStart={{md: '8'}}
          fontSize="sm"
          spacing={{base: '2', md: '8'}}
          textAlign={{base: 'center', md: 'start'}}
        >
          <Link to={routes.default.path}>
            <Text color={useColorModeValue('primary.500', 'primary.300')}>&copy; {new Date().getFullYear()}{' '}Doctory</Text>
          </Link>
          {/* TODO: add terms and conditions */}
          <Text>Términos y condiciones</Text>
        </Stack>
      </Flex>
    </Box>
  )
}