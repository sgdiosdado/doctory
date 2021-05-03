import React, { useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { PresetationCard } from '../../components/PresentationCard';
import avatar from '../../assets/PowerPeople_Emma.png';
import { AddButton } from '../../components/TimeLine/AddButton';
import { NewConditionForm } from './NewConditionForm';
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
  TabPanel
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BackgroundSubtypeData, ConditionData, userInformation } from '../../http/types';
import { http } from '../../http/client';
import { useToast } from "@chakra-ui/react"
import { useMutation, useQuery } from 'react-query';
import { ConditionsTimeLine } from './ConditionsTimeLine';
import { ConditionsTable } from './ConditionsTable';


export const PatientHomeView = () => {
  const [userData, setUserData] = useState<userInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    sex: '',
    type: [''],
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [backgroundSubtypes, setBackgroundSubtype] = useState<BackgroundSubtypeData[]>([])
  
  const [conditions, setConditions] = useState<ConditionData[]>([])

  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});

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

  const { mutate: mutateNewCondition } = useMutation('newCondition', (values:ConditionData) => http.newCondition(values), {onSuccess: onSuccessNewCondition, onError})

  const onSubmit = (values:ConditionData) => {
    mutateNewCondition(values);
  }

  useQuery('conditions', () => http.conditions(), {
    onSuccess: (data:ConditionData[]) => setConditions(data),
    onError
  })
  useQuery('profile', () => http.getProfileInfo(), {
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
        <PresetationCard userData={userData} avatar={avatar}/>
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
      
      <Drawer 
        placement={useBreakpointValue({base: 'bottom', lg: 'right'})}
        isOpen={isOpen}
        onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton/>
              <DrawerHeader borderBottomWidth='1px'>
                Nueva condición
              </DrawerHeader>

              <DrawerBody>
                <NewConditionForm
                  onSubmit={onSubmit}
                  formId='form-condition'
                  backgroundSubtypes={backgroundSubtypes}/>
              </DrawerBody>
              
              <DrawerFooter>
                <Button
                  type='submit'
                  form='form-condition'
                  leftIcon={<AddIcon/>}
                  colorScheme='primary'>Añadir</Button>
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
        onClick={onOpen}
      >
        <AddButton/>
      </Box>
    </>
  )
}
