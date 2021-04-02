import React, { FormEvent, useState } from 'react'
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
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { ValidPasswordChecklist } from './validPasswordChecklist';

type FormData = {
	email: string
	firstName: string
	lastName: string
	password1: string
	password2: string
}

export const SignUpView = () => {
	const MB = 4

	const { register, handleSubmit, errors } = useForm<FormData>();

	const [password, setPassword] = useState<string>('');

	const [initialPassword, setInitialPassword] = useState<boolean>(false);

	// const 
	// 	isValid,
	// 	hasValidLength,
	// 	hasNumber,
	// 	hasUpperCase,
	// 	hasLowerCase,
	// 	hasSpecialChar,
	// ] = usePasswordValidation({password: password})

	const {isValid, hasValidLength, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar} = usePasswordValidation({password});

	const onSubmit = (values: FormData) => {
		console.log(values);
	}

	const handlePasswordChange = (e:FormEvent) => {
		setPassword(e.target.value);
		setInitialPassword(true);
	}

	return (
		<Flex
			minH={'100%'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.100', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Registrarse</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>

					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl
							mb={MB}
							isInvalid={errors.firstName}>
							<FormLabel htmlFor='firstName'>Nombre</FormLabel>
							<Input
								name='firstName'
								type='text'
								autoComplete='on'
								placeholder='Juan'
								ref={register({required: 'El nombre es obligatorio'})}
							/>
							<FormErrorMessage>
								{errors.firstName && errors.firstName.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							mb={MB}
							isInvalid={errors.lastName}>
							<FormLabel htmlFor='lastName'>Apellido</FormLabel>
							<Input
								name='lastName'
								type='text'
								autoComplete='on'
								placeholder='Pérez'
								ref={register({required: 'El apellido es obligatorio'})}
							/>
							<FormErrorMessage>
								{errors.lastName && errors.lastName.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							mb={MB}
							isInvalid={errors.email}>
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
							isInvalid={initialPassword ? !isValid : null}>
							<FormLabel htmlFor='password1'>Contraseña</FormLabel>
							<Input
								name='password1'
								type='password'
								autoComplete='off'
								placeholder='Contraseña segura'
								value={password}
								onChange={handlePasswordChange}
								ref={register({required: true})}
								mb={MB/2}
							/>
							<ValidPasswordChecklist
								hasNumber={hasNumber}
								hasLowerCase={hasLowerCase}
								hasUpperCase={hasUpperCase}
								hasSpecialChar={hasSpecialChar}
								hasValidLength={hasValidLength}/>
						</FormControl>

						<FormControl
							mb={MB}
							isInvalid={errors.password2}>
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
									validate: (value:string) => value === password || 'Las contraseñas no coinciden'
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
	)
}