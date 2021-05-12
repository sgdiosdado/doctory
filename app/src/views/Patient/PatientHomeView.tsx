import React, { useState } from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import { PresetationCard } from '../../components/PresentationCard';
import avatar from '../../assets/PowerPeople_Emma.png';
import { AddButton } from '../../components/TimeLine/AddButton';
import { ShareButton } from '../../components/ShareButton';
import { NewConditionForm } from './NewConditionForm';
import { ShareHistoryForm } from './ShareHistoryForm';
import { Icon } from "@chakra-ui/react"
import { MdShare } from "react-icons/md"
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useBreakpointValue,
  ToastPosition,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  DrawerProps
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BackgroundSubtypeData, ConditionData, userInformation, ShareData } from '../../http/types';
import { http } from '../../http/client';
import { useToast } from "@chakra-ui/react"
import { useMutation, useQuery } from 'react-query';
import { ConditionsTimeLine } from './ConditionsTimeLine';
import { ConditionsTable } from './ConditionsTable';
import { useParams } from 'react-router';

export const PatientHomeView = () => {
  const {id: patientId} = useParams();
  const [share, setShare] = useState<boolean>(false);
  
  const [userData, setUserData] = useState<userInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    sex: '',
    type: [''],
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  //const { isOpenShare, onOpenShare, onCloseShare } = useDisclosure()

  const onOpenCond = () => {
    setShare(false)
    onOpen()
    
  }
  const onOpenShare= () => {
    setShare(true)
    onOpen()
    
  }

  const [backgroundSubtypes, setBackgroundSubtype] = useState<BackgroundSubtypeData[]>([])
  
  const [conditions, setConditions] = useState<ConditionData[]>([])

  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  const drawerPlacement = useBreakpointValue({base: 'bottom', lg: 'right'});

  const onSuccessNewCondition = (data:ConditionData) => {
    const conds = [...conditions, data]
    conds.sort((x, y) => x.date_of_diagnosis < y.date_of_diagnosis ? 1 : -1)
    setConditions(conds)
    onClose();
    toast({
      title: 'Condición creada',
      description: 'Se ha añadido una nueva condición a tu historia clínica',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }

  const onSuccessShareHistory = () => {
    onClose();
    toast({
      title: 'Hisoria clínica compartida',
      description: 'Se ha compartido tu historia clínica',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }
  
  const onError = (data:Error) => {
    if(data.message === 'Failed to fetch') data.message = 'Comprueba tu conexión a internet e intenta de nuevo.'
    else if(data.message === 'This user does not exist.') data.message = 'Usuario inexistente.'
    toast({
      title: 'Ups!',
      description: data.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }

  const { mutate: mutateNewCondition } = useMutation('newCondition', (values:ConditionData) => http.newCondition(values), {onSuccess: onSuccessNewCondition, onError})

  const { mutate: mutateShareHistory } = useMutation('shareHistory', (values:ShareData) => http.shareHistory(values), {onSuccess: onSuccessShareHistory, onError})

  const onSubmit = (values:ConditionData) => {
    mutateNewCondition(values);
  }

  const onSubmitShare = (values:ShareData) => {
    mutateShareHistory(values)
  }

  useQuery('conditions', () => http.conditions(patientId), {
    onSuccess: (data:ConditionData[]) => setConditions(data),
    onError
  })
  useQuery('profile', () => http.getProfileInfo(patientId), {
    onSuccess: (data:userInformation) => setUserData(data),
    onError
  })
  useQuery('background-subtypes', () => http.backgroundSubtypes(), {
    onSuccess: (data:BackgroundSubtypeData[]) => setBackgroundSubtype(data),
    onError
  })

  return (
    <>
      <VStack>
        <Text fontSize='4xl'>Historia Médica</Text>
        <HStack>
          <PresetationCard userData={userData} avatar={avatar}/>
          {!patientId && <>
          <Box
            display='inline-block'
            ml='auto'
            mr='1rem'
            mb='1rem'
            position='sticky'
            bottom='1rem'
            right='1rem'
            onClick={onOpenShare}
          >
            <ShareButton/>
          </Box>
          </>
          }
        </HStack>
        <Box
          w='100%'
          pt='2rem'
          maxW={{base: '100%', md: '75%', lg: '50%'}}
        >
          <Tabs isFitted>
            <TabList>
              <Tab>Línea del tiempo</Tab>
              <Tab>Tabla</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ConditionsTimeLine conditions={conditions}/>
              </TabPanel>
              <TabPanel overflowX={{base: 'scroll', lg: 'visible'}}>
                <ConditionsTable conditions={conditions}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
      {!patientId && <>
        <Drawer 
          placement={drawerPlacement as DrawerProps['placement']}
          isOpen={isOpen}
          onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader borderBottomWidth='1px'>
                  {
                    !share 
                    ?
                    "Nueva condición"
                    :
                    "Compartir historia clínica"
                  }
                  
                </DrawerHeader>

                <DrawerBody>
                {
                    !share 
                    ?
                    <NewConditionForm
                    onSubmit={onSubmit}
                    formId='form-condition'
                    backgroundSubtypes={backgroundSubtypes}/>
                    :
                    <ShareHistoryForm
                    onSubmit={onSubmitShare}
                    formId='form-share'/>
                  }
                  
                </DrawerBody>
                
                <DrawerFooter>
                {
                    !share 
                    ?
                  <Button
                    type='submit'
                    form='form-condition'
                    leftIcon={<AddIcon/>}
                    colorScheme='primary'>Añadir</Button>
                    :
                    <Button
                    type='submit'
                    form='form-share'
                    leftIcon={<Icon as={MdShare}/>}
                    colorScheme='primary'>Compartir</Button>
                }
                </DrawerFooter>
              </DrawerContent>
            </DrawerOverlay>
        </Drawer>
        <Box
          display='inline-block'
          ml='auto'
          mr='1rem'
          mb='1rem'
          position='sticky'
          bottom='1rem'
          onClick={onOpenCond}
        >
          <AddButton/>
        </Box>
      </>
      }
    </>
  )
}
