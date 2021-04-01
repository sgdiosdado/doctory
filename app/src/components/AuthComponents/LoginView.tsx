import React from 'react'
import { 
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
  
  export default function LoginView() {
    return (
      <Flex
        minH={'100%'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.100', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Iniciar sesión</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Correo</FormLabel>
                <Input 
                  type="email" 
                  autoComplete='off'
                  placeholder='ejemplo@gmail.com'
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input 
                  type="password" 
                  autoComplete='off'
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'end'}>
                  <ChakraLink 
                    color={'primary.400'}
                    _hover={{
                      color: 'primary.500'
                    }}
                  >
                      ¿Olvidó la contraseña?
                  </ChakraLink>
                </Stack>
                <Button
                  bg={'primary.400'}
                  color={'white'}
                  _hover={{
                    bg: 'primary.500',
                  }}>
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  