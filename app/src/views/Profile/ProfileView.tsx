import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
  Avatar,
  AvatarBadge,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  useToast,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  ToastPosition,
} from "@chakra-ui/react"
import avatar from '../../assets/PowerPeople_Emma.png';
import { AddIcon } from '@chakra-ui/icons';
import { FaCamera } from 'react-icons/fa';
import { sexTypes, userTypes } from '../../utils/typesDefinitions';
import { ChangePasswordData, FunctionError, FunctionOk, userInformation } from '../../http/types';
import { http } from '../../http/client';
import { isValidDate } from '../../utils/utils';
import { connectionErrorToast } from '../../utils/connectionErrorToast';
import { ChangePasswordForm } from './ChangePasswordForm';
import { setToken } from '../../utils/token';

export const ProfileView = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const [allergiesObject, setAllergiesObject] = useState<{id: number, value: string}[]>([{id:0,value:''},]);
  const [lastKnownAllergiesId, setLastKnownAllergiesId] = useState(1)
  const [specialties, setSpecialties] = useState(['']);
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  const toast = useToast();
  const [data, setData] = useState<userInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    sex: '',
    type: [''],
  });

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, errors, setValue } = useForm<userInformation>();
  const ok = useCallback((_, data) => {
    
    const parseArrayToAllergiesObject = (allergies:string[] = ['']) => {
      if (!allergies || allergies.length === 0) allergies = [''];
      
      let localLastKownID = lastKnownAllergiesId;
      const res = allergies.map(allergy => ({
        id: localLastKownID++,
        value: allergy
      }));    
      setLastKnownAllergiesId(localLastKownID);
      return res;
    }
    const userData = data as userInformation;
    const {patient, medic} = userData;
    setValue('sex', userData.sex)
    setData(userData);
    
    if (userData.type.includes(userTypes.PATIENT)) {
      register('patient.allergies');
      setAllergiesObject(parseArrayToAllergiesObject(patient && patient.allergies));
    }
    if (userData.type.includes(userTypes.MEDIC)) {
      register('medic.specialties');
      setValue('medic.specialties', medic? medic.specialties : ['']);
      setSpecialties(medic? medic.specialties : ['']);
    }
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setValue, register])
  
  const connectionError = () => {
    setIsLoading(false);
    toast(connectionErrorToast());
  }  

  useEffect(() => {
    http.getProfileInfo(ok, () => {setIsLoading(false);}, connectionError);
    //eslint-disable-next-line
  }, [ok])

  const onSubmit = (values: userInformation) => {
    setIsLoading(true);
    if (data.type.includes(userTypes.PATIENT)) {
      values.patient && (values.patient.allergies = allergiesObject.map(x => x.value).filter(y => y !== ''));
      console.log(allergiesObject);
      
    }
    const ok:FunctionOk = () => {
      setIsLoading(false);
      
      toast({
        description: '¡Tu información se ha guardado con éxito!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: toastPosition as ToastPosition,
        variant: 'left-accent'
      })
    }
    const error:FunctionError = (_, error) => {
      setIsLoading(false);
      console.log('error', error);
    }
    http.putProfileInfo(values, ok, error, connectionError);
  }

  const addSpecialtyField = () => setSpecialties((s) => [...s, '']);
  
  const addAllergyField = () => {
    setAllergiesObject(obj => {
      const newValue = {id: lastKnownAllergiesId, value: ''};
      setLastKnownAllergiesId(x => x+1);
      return [...obj, newValue];
    })
  }

  const handleValueArrChange = (e: ChangeEvent<HTMLInputElement>, index: number, name:string,  setArrValue: Dispatch<SetStateAction<string[]>>) => {
    setArrValue(values => {
      let newValues = [...values];
      newValues[index] = e.target.value;
      setValue(name, newValues);
      return newValues;
    })
  }
  
  const handleAllergieChange = (e: ChangeEvent<HTMLInputElement>, allergy:{id:number, value:string} ) => {
    let allergyId = allergiesObject.findIndex(x => x.id === allergy.id);
    setAllergiesObject(allergies => {    
      let newValues = [...allergies];
      newValues[allergyId] = {...allergy, value:e.target.value};
      return newValues
    })
  }

  const onChangePassword = (values:ChangePasswordData) => {
    const ok = (_:number, data:{token:string}) => {
      setToken(data.token)
      onClose()
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña se ha cambiado exitosamente. Los otros equipos dónde utilices doctory tendrán que volver a iniciar sesión.',
        status: 'success',
        duration: 10000,
        isClosable: true,
        position: toastPosition as ToastPosition,
      })
    }
    http.updatePassword(values, ok, ()=>{}, connectionError)
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
      <Drawer
        placement={useBreakpointValue({base: 'bottom', lg: 'right'})}
        isOpen={isOpen}
        onClose={onClose}
        >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>
              Actualizar contraseña
            </DrawerHeader>

            <DrawerBody>
              <ChangePasswordForm formId='change-password-form' onSubmit={onChangePassword}/>
            </DrawerBody>

            <DrawerFooter>
              <Button
                type='submit'
                form='change-password-form'
                leftIcon={<AddIcon/>}
                colorScheme='primary'>Cambiar contraseña</Button>
            </DrawerFooter>

          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    <Flex
      flexGrow={1}
      align={'flex-start'}
      justify={'center'}
      py={12}
      w={'100%'}
    >
    <VStack w={'100%'} mb={12} >
      <Heading fontSize={'3xl'}>Editar Perfil</Heading>
      <Stack w={'100%'} align={'center'}>
        <Avatar src={avatar} size="2xl" mb={4}>
          <AvatarBadge
            boxSize=".8em"
            borderColor="transparent"
            bg="white"
            _hover={{color:'gray.500'}}>
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
            isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor='email'>Contraseña</FormLabel>
            <Button onClick={onOpen} variant='link' colorScheme='primary'>Cambiar contraseña</Button>
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
                validate: value => isValidDate(value) || 'La fecha no es válida',
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
                  key={'specialty-'+index} // TODO: 
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
            <FormLabel htmlFor='allergies'>Alergias</FormLabel>
            {allergiesObject.map((allergy) => (
              <HStack
                mb={2}
                key={allergy.id}
              >
                {BulletPoint()}
                <Input
                  value={allergy.value}
                  onChange={e => handleAllergieChange(e, allergy)}
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
                disabled={allergiesObject[allergiesObject.length-1] && allergiesObject[allergiesObject.length-1].value === ''}
                onClick={addAllergyField}
                leftIcon={<AddIcon/>}
              >Agregar</Button>
              </div>
            </HStack>
          </FormControl>
          }
          <Stack  w={'100%'} align='flex-end'>
            <Button 
              isLoading={isLoading}
              colorScheme='primary'
              type="submit"
            >
              Guardar
            </Button>
          </Stack>
        </form>
      </Box>
    </VStack>
    </Flex>
  </Container>
  )
}