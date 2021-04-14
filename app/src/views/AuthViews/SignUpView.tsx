import React, { ChangeEvent, useState } from 'react'
import {
  Flex,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { ValidPasswordChecklist } from './validPasswordChecklist';
import { SignUpData, FunctionOk, FunctionError } from '../../http/types';
import { http } from '../../http/client';

export const SignUpView = () => {
  const MB = 4

  const { register, handleSubmit, errors } = useForm<SignUpData>();

  const [password, setPassword] = useState<string>('');

  const [initialPassword, setInitialPassword] = useState<boolean>(false);

  const {
    isValid,
    hasValidLength,
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar } = usePasswordValidation({ password });

  const onSubmit = (values: SignUpData) => {
    console.log(values);
    const ok: FunctionOk = (statusCode, data) => {
      // TODO: Implement redirect
      console.log('Redirecting to home page...')
      console.log(data)
      // setAlert(defaultAlert)
    }
    const error: FunctionError = (statusCode, error) => {
      console.log(error);
      // setAlert({ status: 'error', title: 'Ups!', description: loginError.credentials[0], show: true })
    }
    http.signup(values, ok, error);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setInitialPassword(true);
  }

  return (
    <Container
      w="100%"
      h="100%"
      maxW="100%"
			d={'flex'}
			flexGrow={1}
		>
      <Flex
        flexGrow={1}
        align={'center'}
        justify={'center'}>
        <Stack
          spacing={8}
          maxW={'lg'}
          py={12}
          px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Registrarse</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            minW={'xs'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                mb={MB}
                isInvalid={Boolean(errors.first_name)}>
                <FormLabel htmlFor='first_name'>Nombre</FormLabel>
                <Input
                  name='first_name'
                  type='text'
                  autoComplete='on'
                  placeholder='Juan'
                  ref={register({ required: 'El nombre es obligatorio' })}
                />
                <FormErrorMessage>
                  {errors.first_name && errors.first_name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={MB}
                isInvalid={Boolean(errors.last_name)}>
                <FormLabel htmlFor='last_name'>Apellido</FormLabel>
                <Input
                  name='last_name'
                  type='text'
                  autoComplete='on'
                  placeholder='Pérez'
                  ref={register({ required: 'El apellido es obligatorio' })}
                />
                <FormErrorMessage>
                  {errors.last_name && errors.last_name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={MB}
                isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Input
                  name='email'
                  type='email'
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
                mb={MB}
                isInvalid={Boolean(initialPassword ? !isValid : null)}>
                <FormLabel htmlFor='password1'>Contraseña</FormLabel>
                <Input
                  name='password1'
                  type='password'
                  autoComplete='off'
                  placeholder='Contraseña segura'
                  value={password}
                  onChange={handlePasswordChange}
                  ref={register({ required: true })}
                  mb={MB / 2}
                />
                {!isValid && <ValidPasswordChecklist
                  hasNumber={hasNumber}
                  hasLowerCase={hasLowerCase}
                  hasUpperCase={hasUpperCase}
                  hasSpecialChar={hasSpecialChar}
                  hasValidLength={hasValidLength} />}
              </FormControl>

              <FormControl
                mb={MB}
                isInvalid={Boolean(errors.password2)}>
                <FormLabel htmlFor='password2'>
                  Confirmar contraseña
                </FormLabel>
                <Input
                  name='password2'
                  type='password'
                  autoComplete='off'
                  placeholder='Repetir contraseña'
                  ref={register({
                    required: 'Es obligatorio confirmar la contraseña',
                    validate: (value: string) => value === password || 'Las contraseñas no coinciden'
                  })}
                />
                <FormErrorMessage>
                  {errors.password2 && errors.password2.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                onClick={_ => setInitialPassword(true)}
                type='submit'>
                Registrar
              </Button>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Container>
  )
}