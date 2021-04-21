import React, { useState } from 'react';
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  AlertStatus
} from '@chakra-ui/react';
import { http } from '../../http/client';
import { useForm } from 'react-hook-form';
import { FunctionError, LoginData, LoginError  } from '../../http/types';
import { FunctionOk } from '../../http/types';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes/routes';

type AlertData = {
  status: AlertStatus;
  title: string;
  description: string;
  show: boolean;
}

export const LoginView = () => {
  const defaultAlert:AlertData = { status: 'info', title: '', description: '', show: false }
  const { register, handleSubmit, errors } = useForm<LoginData>();
  const history = useHistory()

  const [alert, setAlert] = useState(defaultAlert)

  const onSubmit = (values: LoginData) => {
    setAlert(defaultAlert)
    const ok: FunctionOk = (statusCode, data) => {
      console.log('Redirecting to home page...')
      history.push(routes.patientHome.path)
    }
    const error: FunctionError = (statusCode, error) => {
      console.log(error);
      const loginError = error as LoginError;
      setAlert({ status: 'error', title: 'Ups!', description: loginError.credentials[0], show: true })
    }
    http.login(values, ok, error);
  }

  return (
    <>
      {alert.show && <Box
        w={{ base: '90%', md: '75%' }}
        mx='auto'
        pos='fixed'
        top='5rem'
        left='50%'
        transform='translateX(-50%)'>
        <Alert status={alert.status} variant='left-accent'>
          <AlertIcon />
          <AlertTitle mr={2}>{alert.title}</AlertTitle>
          <AlertDescription mr={8}>{alert.description}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setAlert(defaultAlert)} />
        </Alert>
      </Box>}
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
                <ChakraLink>¿Olvidó la contraseña?</ChakraLink>
                <Button type="submit">Entrar</Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
