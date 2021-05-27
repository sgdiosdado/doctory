import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'
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
import { ChangePasswordData, UserInformation, Allergy, Specialty } from '../../http/types';
import { http } from '../../http/client';
import { isValidDate } from '../../utils/utils';
import { ChangePasswordForm } from './ChangePasswordForm';
import { setToken } from '../../utils/token';
import { useMutation, useQuery } from 'react-query';
import { HomeDrawer } from '../../components/HomeDrawer';


const BulletPoint = () => (
  <Box 
    bg= 'currentcolor'
    borderRadius= '50%'
    w='5px'
    h='5px'
    mx='.5em'
  />
)


export const ProfileView = () => {
  
  const [isLoading, setIsLoading] = useState(true)

  const [allergies, setAllergies] = useState<Allergy[]>( [{id: 1, name: ''}] );
  const [allergiesToDelete, setAllergiesToDelete] = useState<Allergy[]>();

  const [specialties, setSpecialties] = useState<Specialty[]>( [{id: 1, name: ''}] );
  const [specialtiesToDelete, setSpecialtiesToDelete] = useState<Specialty[]>();

  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  const toast = useToast();

  const [data, setData] = useState<UserInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    sex: '',
    type: [''],
  });

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, errors, setValue } = useForm<UserInformation>();

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

  // function when is succes on getting profile info
  const ok = useCallback((_, data) => {
    const userData = data as UserInformation;
    setData(userData);
    setValue('sex', userData.sex);
    
    setAllergies(userData.allergies || [{id:1, name: ''}]);
    
    userData.type.includes(userTypes.MEDIC) &&
      setSpecialties(userData.specialties || [{id:1, name: ''}]);
    
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setValue, register])


  // Get profile info
  useQuery('profile', () => http.getProfileInfo(), {
    onSuccess: (data:UserInformation) => ok(null, data),
    onError,
    onSettled: () => setIsLoading(false)
  })


  

  const { mutate: mutateProfile } = useMutation('updateProfile', (values:UserInformation) => http.updateProfile(values), {
    onSuccess: () => {
      toast({
        description: '¡Tu información se ha guardado con éxito!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: toastPosition as ToastPosition,
      })
    },
    onError,
    onSettled: () => setIsLoading(false)
  });
  
  const { mutate: Alergies } = useMutation('updateProfile', (values:UserInformation) => http.updateProfile(values), {
    onSuccess: () => {
      toast({
        description: '¡Tu información se ha guardado con éxito!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: toastPosition as ToastPosition,
      })
    },
    onError,
    onSettled: () => setIsLoading(false)
  });

  const { mutate: mutatePassword } = useMutation('changePassword', (values:ChangePasswordData) => http.updatePassword(values), {
    onSuccess: ({ token }:{token:string}) => {
      setToken(token)
      onClose()
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña se ha cambiado exitosamente. Los otros equipos dónde utilices doctory tendrán que volver a iniciar sesión.',
        status: 'success',
        duration: 10000,
        isClosable: true,
        position: toastPosition as ToastPosition,
      })
    },
    onError,
    onSettled: () => setIsLoading(false)
  });

  const onSubmit = (values: UserInformation) => {
    setIsLoading(true);
    
    // values.allergies = allergiesObject.map(x => x.value).filter(y => y !== '');
    // values.specialties = undefined; // TODO: Medic Specialties
    console.log(values);

    // Post profile data
    mutateProfile(values);
  }

  const addSpecialtyField = () => setSpecialties((s) => [...s]); //TODO
  
  // const addAllergyField = () => {
  //   setAllergiesObject(obj => {
  //     const newValue = {id: lastKnownAllergiesId, value: ''};
  //     setLastKnownAllergiesId(x => x+1);
  //     return [...obj, newValue];
  //   })
  // }

  const handleValueArrChange = (e: ChangeEvent<HTMLInputElement>, index: number, name:string,  setArrValue: Dispatch<SetStateAction<string[]>>) => {
    setArrValue(values => {
      let newValues = [...values];
      newValues[index] = e.target.value;
      setValue(name, newValues);
      return newValues;
    })
  }
  
  const handleAllergieChange = (e: ChangeEvent<HTMLInputElement>, allergy:Allergy ) => {
    // let allergyId = allergiesObject.findIndex(x => x.id === allergy.id);
    // setAllergiesObject(allergies => {    
    //   let newValues = [...allergies];
    //   newValues[allergyId] = {...allergy, value:e.target.value};
    //   return newValues
    // })
  }

  const onChangePassword = (values:ChangePasswordData) => {
    mutatePassword(values);
  }



  return (
    <Container
    w="100vw"
    h="100%"
    maxW="95%"
    d={'flex'}
    flexGrow={1}
    mx={{base:'1em', md:'2em'}}
    >
      <HomeDrawer 
        drawerPlacement= {useBreakpointValue({base: 'bottom', lg: 'right'})}
        isOpen={isOpen}
        onClose={onClose}
        headerText='Actualizar contraseña'
        Form={ChangePasswordForm({formId: 'change-password-form', onSubmit: onChangePassword})}
        buttonProps={{
          text: 'Cambiar contraseña',
          formId: 'change-password-form'
        }}
      />

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
            mb={4}>
            <FormLabel>Contraseña</FormLabel>
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
                name='license'
                type='text'
                placeholder='12345678'
                defaultValue={data.license || ''}
                ref={register}
              />
            </FormControl>
          }

          { specialties && 
            <FormControl mb={4} >
              <FormLabel htmlFor='specialty'>Especialidad(s)</FormLabel>
              {specialties.map((specialty) => (
                <HStack
                  mb={2}
                  key={specialty.id}
                >
                  {BulletPoint()}
                  <Input
                    value={specialty.name}
                    // onChange={e => handleValueArrChange(e, index, 'specialties', setSpecialties)} //TODO
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

          <FormControl mb={4}>
            <FormLabel htmlFor='blood_type'>Tipo de Sangre</FormLabel>
            <Input
              name='blood_type'
              type='text'
              autoComplete='on'
              placeholder='O+'
              defaultValue={data.blood_type || ''}
              ref={register}
            />
          </FormControl>

          <FormControl
            mb={4}
          >
            <FormLabel htmlFor='allergies'>Alergias</FormLabel>
            {allergies.map((allergy) => (
              <HStack
                mb={2}
                key={allergy.id}
              >
                {BulletPoint()}
                <Input
                  value={allergy.name}
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
                variant="outline" //TODO
                // disabled={allergiesObject[allergiesObject.length-1] && allergiesObject[allergiesObject.length-1].value === ''}
                // onClick={addAllergyField}
                leftIcon={<AddIcon/>}
              >Agregar</Button>
              </div>
            </HStack>
          </FormControl>
          
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