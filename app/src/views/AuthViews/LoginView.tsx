import React, { useContext } from 'react';
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
  Text,
  useBreakpointValue,
  ToastPosition
} from '@chakra-ui/react';
import { Link, useHistory } from "react-router-dom";
import { http } from '../../http/client';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../http/types';
import { routes } from '../../routes/routes';
import { useMutation } from 'react-query';
import { UserContext } from '../../provider/AuthProvider';


export const LoginView = () => {
  const { login } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm<LoginData>();
  const history = useHistory()
  
  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  
  const onSuccess = (type: string[]) => {
    login(type)
    history.push(routes.home.path)
  }
  
  const onError = (data:Error) => {
    if(data.message === 'Failed to fetch') data.message = 'Comprueba tu conexión a internet e intenta de nuevo.'
    toast({
      title: 'Ups!',
      description: data.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }

  const { mutate } = useMutation('login', (values:LoginData) => http.login(values), {onSuccess, onError})
  
  const onSubmit = (values: LoginData) => {
    mutate(values);
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
      </Stack>
     
    </Flex>
  );
}
