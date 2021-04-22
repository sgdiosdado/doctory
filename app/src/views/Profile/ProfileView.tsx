import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { DateTime } from "luxon";

import { Avatar, AvatarBadge, Button, FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from "@chakra-ui/react"
import { Box, Container, Flex, Heading, HStack, Stack, VStack } from '@chakra-ui/layout';
import { FaCamera } from 'react-icons/fa';

import { userInformation } from '../../utils/typesDefinitions';
import avatar from '../../assets/PowerPeople_Emma.png';
import { AddIcon } from '@chakra-ui/icons';
import { FunctionOk, FunctionError } from '../../http/types';
import { http } from '../../http/client';

export const ProfileView = () => {
  const { register, handleSubmit, errors } = useForm<userInformation>();
  const [alergies, setAlrgies] = useState(['']);
  const [data, setData] = useState<userInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
  });

  const onSubmit = (values: userInformation) => {
    console.log(values);
    values.alergies = alergies;
    console.log(values);
    
    
    http.getProfileInfo(ok, error);
  }
  const error: FunctionError = (statusCode, error) => {
    
  }

  const ok: FunctionOk = (_, data) => {
    console.log(data);
    setData(data as userInformation);
    
  }
  
  useEffect(() => {
    http.getProfileInfo(ok, error);
  }, [])

  const isDateValid = (date: string) => {
    const dob = DateTime.fromISO(date);
    if(!dob.isValid || (dob > DateTime.now()) ) {
      return false;
    }
    return true;
  } 
  
  
  const addAlergyField = () => {
    setAlrgies((a) => [...a, '']);
  }

  const handleAlergieInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setAlrgies(algs => {
      let newAlergies = [...algs];
      newAlergies[index] = e.target.value;
      return newAlergies;
    })
  }


  const BulletPoint = () => (
    <Box 
      bg= 'currentcolor'
      borderRadius= '50%'
      w='5px'
      h='5px'
      mx='.5em'
    />
  )

  return (
    <Container
    w="100vw"
    h="100%"
    maxW="95%"
    d={'flex'}
    flexGrow={1}
    mx={{base:'1em', md:'2em'}}
  >
    <Flex
      flexGrow={1}
      align={'flex-start'}
      justify={'center'}
      pt={12}
      w={'100%'}
    >
    <VStack w={'100%'}>
      {/* <Stack  w={'100%'} align={'left'}> */}
        <Heading fontSize={'3xl'}>Editar Perfil</Heading>
      {/* </Stack> */}
      <Stack mb={4} w={'100%'} align={'center'}>
        <Avatar src={avatar} size="2xl">
          <AvatarBadge boxSize=".8em" borderColor="transparent" bg="white" _hover={{color:'gray.500'}}>
            <FaCamera />
          </AvatarBadge>
        </Avatar>
      </Stack>
      <Box
        rounded={'lg'}
        minW={{base:'xs', md: 'md'}}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
        mb={12}
      >
       
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            mb={4}
            isRequired
            isInvalid={Boolean(errors.first_name)}>
            <FormLabel htmlFor='first_name'>Nombre</FormLabel>
            <Input
              name='first_name'
              type='text'
              autoComplete='on'
              placeholder='Juan'
              defaultValue={data.first_name}
              ref={register({ required: 'El nombre es obligatorio' })}
            />
            <FormErrorMessage>
              {errors.first_name && errors.first_name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mb={4}
            isRequired
            isInvalid={Boolean(errors.last_name)}>
            <FormLabel htmlFor='last_name'>Apellido</FormLabel>
            <Input
              name='last_name'
              type='text'
              autoComplete='on'
              placeholder='Pérez'
              defaultValue={data.last_name}
              ref={register({ required: 'El apellido es obligatorio' })}
            />
            <FormErrorMessage>
              {errors.last_name && errors.last_name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mb={4}
            isRequired
            isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor='email'>Correo</FormLabel>
            <Input
              name='email'
              type='email'
              autoComplete='on'
              placeholder='ejemplo@gmail.com'
              disabled={true}
              defaultValue={data.email}
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
            mb={4}
            isRequired
            isInvalid={Boolean(errors.dob)}>
            <FormLabel htmlFor='dob'>Fecha de nacimiento</FormLabel>
            <Input
              name='dob'
              type='date'
              autoComplete='on'
              defaultValue={data.dob}
              ref={register({
                required: 'La fecha es obligatoria',
                validate: value => isDateValid(value) || 'La fecha no es válida',
               })}
            />
            
            <FormErrorMessage>
            {errors.dob && errors.dob.message}
            </FormErrorMessage>
          </FormControl>
          
          <FormControl
            mb={4}
          >
            <FormLabel htmlFor='location'>Lugar de Residencia</FormLabel>
            <Input
              name='location'
              type='text'
              autoComplete='on'
              placeholder='Monterrey, Nuevo León'
              defaultValue={data.location}
              ref={register({ required: false })}
            />
          </FormControl>
          
          <FormControl
            mb={4}
          >
            <FormLabel htmlFor='bloodType'>Tipo de Sangre</FormLabel>
            <Input
              name='bloodType'
              type='text'
              autoComplete='on'
              placeholder='O+'
              defaultValue={data.bloodType}
              ref={register({ required: false })}
            />
          </FormControl>
          
          <FormControl
            mb={4}
          >
            <FormLabel htmlFor='alergies'>Alergias</FormLabel>
            {alergies.map((alergie,index) => (
              <HStack
                mb={2}
                key={'alergie-'+index}
              >
                {BulletPoint()}
                <Input
                  value={alergie}
                  onChange={e => handleAlergieInputChange(e, index)}
                  size='sm'
                  name='location'
                  type='text'
                  placeholder='Pólen'
                />
              </HStack>
            ))}

            <HStack>
              {BulletPoint()}
              <div>
              <Button
                size='sm'
                variant="outline"
                onClick={addAlergyField}
                leftIcon={<AddIcon/>}
              >Agregar</Button>
              </div>
            </HStack>

          </FormControl>
          <Stack  w={'100%'} align={'center'}>
            <Button colorScheme='primary' type="submit">Guardar</Button>
          </Stack>
        </form>
      </Box>
    </VStack>
    </Flex>
  
  </Container>

  )
}