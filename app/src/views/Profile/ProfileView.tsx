import React, { useState } from 'react'
import {
  Avatar,
  AvatarBadge,
  useColorModeValue,
  useToast,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  VStack,
  useDisclosure,
  useBreakpointValue,
  ToastPosition,
} from "@chakra-ui/react"
import avatar from '../../assets/PowerPeople_Emma.png';
import { FaCamera } from 'react-icons/fa';
import { InputArrType, userTypes } from '../../utils/typesDefinitions';
import { ChangePasswordData, UserInformation, Allergy, Specialty } from '../../http/types';
import { http } from '../../http/client';
import { ChangePasswordForm } from './ChangePasswordForm';
import { setToken } from '../../utils/token';
import { useMutation, useQuery } from 'react-query';
import { HomeDrawer } from '../../components/HomeDrawer';
import { ProfileForm } from './ProfileForm';


export const ProfileView = () => {
  
  const [isLoading, setIsLoading] = useState(true)

  const [allergies, setAllergies] = useState<InputArrType>({
    fetched: [],
    toBeDeleted: [],
    toBeAdded: []
  })

  const [specialties, setSpecialties] = useState<InputArrType>({
    fetched: [],
    toBeDeleted: [],
    toBeAdded: []
  })

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
  const ok = (_:any, data:UserInformation) => {
    setData(data);    
    setAllergies( allergies => ({...allergies, fetched: data.allergies || []}));
    
    data.type.includes(userTypes.MEDIC) &&
      setSpecialties( specialties => ({...specialties, fetched: data.specialties || []}));
    
    setIsLoading(false);
  };


  // Get profile info
  useQuery('profile', () => http.getProfileInfo(), {
    onSuccess: (data:UserInformation) => ok(null, data),
    onError,
    onSettled: () => setIsLoading(false)
  })
  

  // Mutation - UPDATE PROFILE
  const { mutate: mutateProfile } = useMutation('updateProfile',
    (values:UserInformation) => http.updateProfile(values), {
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
  
  // Mutation - NEW ALLERGIES
  const { mutate: mutateNewAllergies } = useMutation('newAllergies', (values:Allergy[]) => http.newAllergies(values), {
    onSuccess: (newAllergies:Allergy[]) => {
      setAllergies(oldAllergies => ({
        ...oldAllergies,
        fetched: [...oldAllergies.fetched, ...newAllergies],
        toBeAdded: []
      }))
    },
    onError,
    onSettled: () => setIsLoading(false)
  });

  // Mutation - DELETE ALLERGIES
  const { mutate: mutateDeleteAllergies } = useMutation('deleteAllergies', (values:Allergy[]) => http.deleteAllergies(values), {
    onSuccess: (deletedAllergies:number[] | undefined) => {
      setAllergies(oldAllergies => {
        const newFetched = oldAllergies.fetched.filter(x => !deletedAllergies?.includes(x.id));
        return {
          ...oldAllergies,
          fetched: [...newFetched],
          toBeDeleted: []
        }
      })
    },
    onError,
    onSettled: () => setIsLoading(false)
  });

  // Mutation - NEW SPECIALTIES
  const { mutate: mutateNewSpecialties } = useMutation('newSpecialtes', (values:Specialty[]) => http.newSpecialties(values), {
    onSuccess: (newSpecialties:Specialty[]) => {
      setSpecialties(oldSpecialties => ({
        ...oldSpecialties,
        fetched: [...oldSpecialties.fetched, ...newSpecialties],
        toBeAdded: []
      }))
    },
    onError,
    onSettled: () => setIsLoading(false)
  });

  // Mutation - DELETE SPECALTIES
  const { mutate: mutateDeleteSpecalties } = useMutation('deleteSpecaltes', (values:Specialty[]) => http.deleteSpecialtes(values), {
    onSuccess: (deletedSpecialties:number[] | undefined) => {
      setSpecialties(oldSpecalties => {
        const newFetched = oldSpecalties.fetched.filter(x => !deletedSpecialties?.includes(x.id));
        return {
          ...oldSpecalties,
          fetched: [...newFetched],
          toBeDeleted: []
        }
      })
    },
    onError,
    onSettled: () => setIsLoading(false)
  });

  // Mutation - CHANGE PASSWORD
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

  // User Profile sumbit
  const onSubmit = (values: UserInformation) => {
    setIsLoading(true);
    
    mutateProfile(values);

    if(allergies.toBeAdded.length !== 0) 
      mutateNewAllergies(allergies.toBeAdded)
    
    if(data.type.includes(userTypes.MEDIC) && specialties.toBeAdded.length !== 0) 
      mutateNewSpecialties(specialties.toBeAdded)
    
    if(allergies.toBeDeleted.length !== 0) 
      mutateDeleteAllergies(allergies.toBeDeleted)
  
    if(specialties.toBeDeleted.length !== 0) 
      mutateDeleteSpecalties(specialties.toBeDeleted) 
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
          <ProfileForm 
            formId='profile-form'
            onSubmit={onSubmit}
            data={data}
            onOpenDrawer={onOpen}
            allergies={allergies}
            setAllergies={setAllergies}
            specialties={specialties}
            setSpecialities={setSpecialties}
            isLoading={isLoading}
          />
        </Box>
      </VStack>
    </Flex>
  </Container>
  )
}