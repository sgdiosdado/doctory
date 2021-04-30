import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Divider,
  Text
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { http } from '../../http/client';
import { useForm } from 'react-hook-form';
import { FunctionError, LoginData, LoginError  } from '../../http/types';
import { FunctionOk } from '../../http/types';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { connectionErrorToast } from '../../utils/connectionErrorToast';


export const LoginView = () => {
  const { register, handleSubmit, errors } = useForm<LoginData>();
  const history = useHistory()
  const toast = useToast();
  
  const onSubmit = (values: LoginData) => {
    
    const ok: FunctionOk = (statusCode, data) => {
      history.push(routes.patientHome.path)
    }

    const error: FunctionError = (statusCode, error) => {
      const loginError = error as LoginError;
      toast({
        title: 'Ups!',
        description: Object.values(loginError)[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
        variant: 'left-accent'
      });
    }
    http.login(values, ok, error, () => toast(connectionErrorToast()));
  }

  return (
    <Flex
      flexGrow={1}
      h={'100%'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Stack align={'center'} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'}>Iniciar sesión</Heading>
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.700')}
          minW='xs'
          rounded={'lg'}
          boxShadow={'lg'}
        >

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              mb='4'
              isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Correo</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete='on'
                placeholder='ejemplo@gmail.com'
                ref={register({
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Ingresa un correo electrónico válido',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb='4'
              isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor='password'>Contraseña</FormLabel>
              <Input
                name='password'
                type="password"
                autoComplete='off'
                ref={register({ required: true })}
              />
            </FormControl>
            <Stack spacing={8}>
              <Button type="submit">Entrar</Button>
            </Stack>
          </form>
          <Divider my={4}/>
          <Box textAlign={'center'} >
            <ChakraLink 
              as={Link}
              to={routes.signup.path}>
                <Text color={useColorModeValue('primary.500', 'primary.300')}>Crear una nueva cuenta</Text>
            </ChakraLink>
          </Box>
        </Box>
        <ChakraLink as={Link} to={routes.signin.path}>
          ¿Aún sin cuenta? Crear una cuenta
        </ChakraLink>
      </Stack>
     
    </Flex>
  );
}
