import React, { useContext, useState } from 'react';
import {
  Box,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  VStack,
  useToast,
  useBreakpointValue,
  ToastPosition,
  useDisclosure,
  DrawerProps,
  Icon,
} from '@chakra-ui/react';
import { UserContext } from '../../provider/AuthProvider';
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';
import { BackgroundSubtypeData, ConditionData, userInformation, ShareData } from '../../http/types';
import { http } from '../../http/client';
import { useMutation, useQuery } from 'react-query';
import { ConditionsTimeLine } from '../Conditions/ConditionsTimeLine';
import { ConditionsTable } from '../Conditions/ConditionsTable';
import { PatientsTable } from '../Medic/PatientsTable';
import { NewConditionForm } from '../Conditions/NewConditionForm';
import { AddIcon } from '@chakra-ui/icons';
import { MdShare } from "react-icons/md"
import { userTypes } from '../../utils/typesDefinitions';
import { useParams } from 'react-router-dom';
import { ActionButton } from '../../components/ActionButton';
import { buttonSubmit, HomeDrawer } from '../../components/HomeDrawer';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { ShareHistoryForm } from '../Patient/ShareHistoryForm';
import { TableSkeleton } from '../../components/TableSkeleton';
import { TimeLineSkeleton } from '../../components/TimeLine/TimeLineSkeleton';


export const Home = () => {
  const { authContext } = useContext(UserContext)
  const {id: patientId} = useParams<{id:string}>();
  const lastTabIndex = localStorage.getItem('tableTabIndex');

  const { isOpen, onOpen, onClose } = useDisclosure() 
  const [patients, setPatients] = useState<userInformation[]>([])
  const [backgroundSubtypes, setBackgroundSubtype] = useState<BackgroundSubtypeData[]>([])
  const [conditions, setConditions] = useState<ConditionData[]>([])
  const [tabIndex, setTabIndex] = useState(lastTabIndex? Number(lastTabIndex): 0);

  const [drawerContent, setDrawerContent] = useState<{headerText: string, Form: ReactJSXElement, buttonProps: buttonSubmit}>({
    headerText: '',
    Form: <></>,
    buttonProps: {} as buttonSubmit,
  })

  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  const drawerPlacement = useBreakpointValue({base: 'bottom', lg: 'right'});
  
  const isMedic = authContext.type?.includes(userTypes.MEDIC);

  const handleTabsChange = (index:number) => {
    setTabIndex(index);
    localStorage.setItem('tableTabIndex', String(index));
  };

  const onOpenCond = () => {
    setDrawerContent({
      headerText: 'Nueva condición',
      Form: <NewConditionForm
        onSubmit={onSubmitNewCondition}
        formId='form-condition'
        backgroundSubtypes={backgroundSubtypes}/>,
      buttonProps: {
        formId: 'form-condition',
        icon: <AddIcon/>,
        text: 'Añadir',
      }
    })
    onOpen()
  }

  const onOpenShare = () => {
    setDrawerContent({
      headerText: 'Compartir historia clínica',
      Form: <ShareHistoryForm
        onSubmit={onSubmitShare}
        formId='form-share'/>,
      buttonProps: {
        formId: 'form-share',
        icon: <Icon as={MdShare}/>,
        text: 'Compartir',
      }
    })
    onOpen()
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

  const { mutate: mutateNewCondition } = useMutation('newCondition', (values:ConditionData) => http.newCondition(values), {onSuccess: onSuccessNewCondition, onError})

  const onSubmitNewCondition = (values:ConditionData) => {
    mutateNewCondition(values);
  }

  const { mutate: mutateShareHistory } = useMutation('shareHistory', (values:ShareData) => http.shareHistory(values), {onSuccess: onSuccessShareHistory, onError})

  const onSubmitShare = (values:ShareData) => {
    mutateShareHistory(values)
  }

  const {isFetchedAfterMount: isPatintsFetched} = useQuery('patients', () => http.getPatients(), {
    enabled: isMedic,
    onSuccess: (data:userInformation[]) => setPatients(data),
    onError
  })

  const {isFetchedAfterMount: isConditionsFetched} = useQuery('conditions', () => http.conditions(Number(patientId)), {
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
        src={DoctorsInComputerImage} />
      <Box
        w='100%'
        pt='2rem'
        maxW={{base: '100%', md: '75%', lg: '50%'}} >

        <Tabs isFitted index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            {isMedic && <Tab>Pacientes</Tab>}
            <Tab>Mis condiciones</Tab>
            <Tab>Lista de condiciones</Tab>
          </TabList>

          <TabPanels>
            {isMedic &&
            <TabPanel>
              {isPatintsFetched && <PatientsTable patients={patients} />}
              <TableSkeleton isLoading={!isPatintsFetched} />
            </TabPanel>}
            <TabPanel>
              {isConditionsFetched && <ConditionsTimeLine conditions={conditions} />}
              <TimeLineSkeleton isLoading={!isConditionsFetched} />
            </TabPanel>
            <TabPanel overflowX={{base: 'scroll', lg: 'visible'}}>
              {isConditionsFetched &&  <ConditionsTable conditions={conditions} />}
              <TableSkeleton isLoading={!isConditionsFetched} />
            </TabPanel>
          </TabPanels>
          </Tabs>
      </Box>
    </VStack>
    
    <HomeDrawer
      onClose={onClose}
      isOpen={isOpen}
      drawerPlacement={drawerPlacement as DrawerProps['placement']}
      {...drawerContent}
    />

    {(tabIndex !== 0 || !isMedic) &&
    <>
      <Box
        display='inline-block'
        ml='auto'
        mr='1rem'
        mb='1rem'
        position='sticky'
        bottom='4rem'
        right='1rem'
        onClick={onOpenShare}
      >
        <ActionButton icon={MdShare} />
      </Box>

      <Box
        display='inline-block'
        ml='auto'
        mr='1rem'
        mb='1rem'
        position='sticky'
        bottom='1rem'
        onClick={onOpenCond}
      >
        <ActionButton/>
      </Box>
    </>
    }
    </>
  );
};
