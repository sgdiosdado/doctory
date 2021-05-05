import React, { useState } from 'react';
import { Box, Image, Tabs, TabList, Tab, TabPanel, TabPanels, VStack, useToast, useBreakpointValue, ToastPosition } from '@chakra-ui/react';

import { PatientsTable } from './PatientsTable'
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';
import { userInformation } from '../../http/types';
import { http } from '../../http/client';
import { useQuery } from 'react-query';

export const MedicHomeView = () => {
  const [patients, setPatients] = useState<userInformation[]>([])
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

  useQuery('patients', () => http.getPatients(), {
    onSuccess: (data:userInformation[]) => setPatients(data),
    onError
  })

  return (
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
        <Tabs isFitted>
            <TabList>
              <Tab>Pacientes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PatientsTable patients={patients}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
      </Box>
    </VStack>
  );
};
