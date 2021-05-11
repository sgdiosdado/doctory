import React, { useContext, useState } from 'react';
import { Box, Image, Tabs, TabList, Tab, TabPanel, TabPanels, VStack, useToast, useBreakpointValue, ToastPosition, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, DrawerProps } from '@chakra-ui/react';


import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';
import { BackgroundSubtypeData, ConditionData, userInformation } from '../../http/types';
import { http } from '../../http/client';
import { useMutation, useQuery } from 'react-query';
import { ConditionsTimeLine } from '../Conditions/ConditionsTimeLine';
import { ConditionsTable } from '../Conditions/ConditionsTable';
import { PatientsTable } from '../Medic/PatientsTable';
import { AddButton } from '../../components/TimeLine/AddButton';
import { NewConditionForm } from '../Conditions/NewConditionForm';
import { AddIcon } from '@chakra-ui/icons';
import { UserContext } from '../../provider/AuthProvider';
import { userTypes } from '../../utils/typesDefinitions';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const { authContext } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {id: patientId} = useParams<{id:string}>();

  const [patients, setPatients] = useState<userInformation[]>([])
  const [backgroundSubtypes, setBackgroundSubtype] = useState<BackgroundSubtypeData[]>([])
  const [conditions, setConditions] = useState<ConditionData[]>([])
  const [tabIndex, setTabIndex] = useState(0);

  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  const drawerPlacement = useBreakpointValue({base: 'bottom', lg: 'right'});

  const isMedic = authContext.type?.includes(userTypes.MEDIC);

  const handleTabsChange = (index:number) => {
    setTabIndex(index);
  };

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

  const { mutate: mutateNewCondition } = useMutation('newCondition', (values:ConditionData) => http.newCondition(values), {onSuccess: onSuccessNewCondition, onError})

  const onSubmit = (values:ConditionData) => {
    mutateNewCondition(values);
  }

  useQuery('patients', () => http.getPatients(), {
    enabled: isMedic,
    onSuccess: (data:userInformation[]) => setPatients(data),
    onError
  })
  useQuery('conditions', () => http.conditions(Number(patientId)), {
    onSuccess: (data:ConditionData[]) => setConditions(data),
    onError
  })

  useQuery('background-subtypes', () => http.backgroundSubtypes(), {
    onSuccess: (data:BackgroundSubtypeData[]) => setBackgroundSubtype(data),
    onError
  })


  return ( <>
    <VStack>
      <Image 
        maxH='15rem'
        src={DoctorsInComputerImage}
      />
      <Box
        w='100%'
        pt='2rem'
        maxW={{base: '100%', md: '75%', lg: '50%'}}
      >
        <Tabs isFitted index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            {isMedic && <Tab>Pacientes</Tab>}
            <Tab>Mis condiciones</Tab>
            <Tab>Lista de condiciones</Tab>
          </TabList>

          <TabPanels>
            {isMedic &&
            <TabPanel>
              <PatientsTable patients={patients} />
            </TabPanel>}
            <TabPanel>
              <ConditionsTimeLine conditions={conditions} />
            </TabPanel>
            <TabPanel overflowX={{base: 'scroll', lg: 'visible'}}>
              <ConditionsTable conditions={conditions} />
            </TabPanel>
          </TabPanels>
          </Tabs>
      </Box>
    </VStack>
    <Drawer 
      placement={drawerPlacement as DrawerProps['placement']}
      isOpen={isOpen}
      onClose={onClose}
    >
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
    {(tabIndex !== 0 || !isMedic) &&
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
    }
  </>
  );
};
