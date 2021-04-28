import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { DateTime } from "luxon";

import { Avatar, AvatarBadge, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, useColorModeValue } from "@chakra-ui/react"
import { Box, Container, Flex, Heading, HStack, Stack, VStack } from '@chakra-ui/layout';
import { FaCamera } from 'react-icons/fa';

import { sexTypes, userInformation, userTypes } from '../../utils/typesDefinitions';
import avatar from '../../assets/PowerPeople_Emma.png';
import { AddIcon } from '@chakra-ui/icons';
import { FunctionError, FunctionOk } from '../../http/types';
import { http } from '../../http/client';

export const ProfileView = () => {
  const { register, handleSubmit, errors, setValue } = useForm<userInformation>();
  const [alergies, setAlergies] = useState(['']);
  const [specialties, setSpecialties] = useState(['']);
  const [data, setData] = useState<userInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    sex: '',
    type: [''],
  });
  
  const error: FunctionError = (statusCode, error) => {
    console.log(statusCode, error);
  }
  
  const ok = useCallback((_, data) => {
      const userData = data as userInformation;
      const {patient, medic} = userData;
      setValue('sex', userData.sex)
      setData(userData);
      if (userData.type.includes(userTypes.PATIENT) && patient) {
        register('patient.alergies');
        setValue('patient.alergies', patient.alergies);
        setAlergies(patient.alergies);
      }
      if (userData.type.includes(userTypes.MEDIC) && medic) {
        register('medic.specialties');
        setValue('medic.specialties', medic.specialties);
        setSpecialties(medic.specialties);
      }
    },
    [setValue, register],
  )

  useEffect(() => {
    http.getProfileInfo(ok, error);
  }, [ok])
  

  const onSubmit = (values: userInformation) => {
    console.log(values);
    http.putProfileInfo(values, ()=>{}, error)
  }
  
  const isDateValid = (date: string) => {
    const dob = DateTime.fromISO(date);
    return (dob.isValid && (dob < DateTime.now()));
  } 
    
  const addAlergyField = () => setAlergies((a) => [...a, '']);
  const addSpecialtyField = () => setSpecialties((s) => [...s, '']);

  const handleValueArrChange = (e: ChangeEvent<HTMLInputElement>, index: number, name:string,  setArrValue: Dispatch<SetStateAction<string[]>>) => {
    setArrValue(values => {
      let newValues = [...values];
      newValues[index] = e.target.value;
      setValue(name, newValues);
      return newValues;
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
      <Heading fontSize={'3xl'}>Editar Perfil</Heading>
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
            <FormLabel htmlFor='first_name'>Nombre(s)</FormLabel>
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
            <FormLabel htmlFor='last_name'>Apellidos</FormLabel>
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
              disabled={true}
              placeholder='ejemplo@gmail.com'
              value={data.email}
              ref={register}
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
            mb={4}>
            <FormLabel htmlFor='sex'>Sexo</FormLabel>
              <Select
                as='select'
                name='sex'
                onChange= {(e) => setValue('sex', e.target.value)}
                ref={register}
              >
                <option value={sexTypes.NOT_SPECIFIED}>Sin especificar</option>
                <option value={sexTypes.FEMALE}>Mujer</option>
                <option value={sexTypes.MALE}>Hombre</option>
                <option value={sexTypes.OTHER}>Otro</option>
              </Select>
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
              ref={register}
            />
          </FormControl>
          
          {data.type.includes(userTypes.MEDIC) &&
            <FormControl mb={4}>
              <FormLabel htmlFor='license'>Cédula Profesional</FormLabel>
              <Input
                name='medic.license'
                type='text'
                placeholder='12345678'
                defaultValue={data.medic? data.medic.license : ''}
                ref={register}
              />
            </FormControl>
          }

          {data.type.includes(userTypes.MEDIC) && 
            <FormControl mb={4} >
              <FormLabel htmlFor='specialty'>Especialidad(s)</FormLabel>
              {specialties.map((specialty,index) => (
                <HStack
                  mb={2}
                  key={'specialty-'+index}
                >
                  {BulletPoint()}
                  <Input
                    value={specialty}
                    onChange={e => handleValueArrChange(e, index, 'medic.specialties', setSpecialties)}
                    size='sm'
                    type='text'
                    placeholder='Cirujano'
                  />
                </HStack>
              ))}

              <HStack>
                {BulletPoint()}
                <div>
                <Button
                  size='sm'
                  variant="outline"
                  onClick={addSpecialtyField}
                  leftIcon={<AddIcon/>}
                >Agregar</Button>
                </div>
              </HStack>
            </FormControl>
          }

          {data.type.includes(userTypes.PATIENT) &&
            <FormControl mb={4}>
              <FormLabel htmlFor='blood_type'>Tipo de Sangre</FormLabel>
              <Input
                name='patient.blood_type'
                type='text'
                autoComplete='on'
                placeholder='O+'
                defaultValue={data.patient? data.patient.blood_type : ''}
                ref={register}
              />
            </FormControl>
          }

          {data.type.includes(userTypes.PATIENT) && 
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
                  onChange={e => handleValueArrChange(e, index, 'patient.alergies', setAlergies)}
                  size='sm'
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
          }
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