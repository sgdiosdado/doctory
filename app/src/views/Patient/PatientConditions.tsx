import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import {
  useBreakpointValue,
  ToastPosition,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  VStack,
  useToast
} from '@chakra-ui/react';
import avatar from '../../assets/PowerPeople_Emma.png';
import { PresetationCard } from '../../components/PresentationCard';
import { ConditionsTimeLine } from '../Conditions/ConditionsTimeLine';
import { ConditionsTable } from '../Conditions/ConditionsTable';
import { ConditionData, UserInformation } from '../../http/types';
import { http } from '../../http/client';
import { PresentationSkeletonCard } from '../../components/PresentationSkeletonCard';
import { TimeLineSkeleton } from '../../components/TimeLine/TimeLineSkeleton';
import { TableSkeleton } from '../../components/TableSkeleton';

export const PatientConditions = () => {
  const {id: patientId} = useParams<{id:string}>();
  const [userData, setUserData] = useState<UserInformation>({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    sex: '',
    type: [''],
  })
  
  const [conditions, setConditions] = useState<ConditionData[]>([])

  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  
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

  const {isFetchedAfterMount: isConditionsFetched} = useQuery('conditions', () => http.conditions(Number(patientId)), {
    onSuccess: (data:ConditionData[]) => setConditions(data),
    onError
  })
  
  const {isFetchedAfterMount: isProfileFetched} = useQuery('profile', () => http.getProfileInfo(Number(patientId)), {
    onSuccess: (data:UserInformation) => setUserData(data),
    onError
  })

  return (
    <>
      <VStack pt='2rem'>
        <PresentationSkeletonCard isLoading={!isProfileFetched} />
        {isProfileFetched && <PresetationCard userData={userData} avatar={avatar} />}
        <Box
          w='100%'
          pt='2rem'
          maxW={{base: '100%', md: '75%', lg: '50%'}}
        >
          <Tabs isFitted>
            <TabList>
              <Tab>Línea del tiempo</Tab>
              <Tab>Lista de condiciones</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <TimeLineSkeleton isLoading={!isConditionsFetched}/>
                {isConditionsFetched && <ConditionsTimeLine conditions={conditions}/>}
              </TabPanel>
              <TabPanel overflowX={{base: 'scroll', lg: 'visible'}}>
                <TableSkeleton isLoading={!isConditionsFetched} />
                {isConditionsFetched && <ConditionsTable conditions={conditions}/>}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </>
  )
}
