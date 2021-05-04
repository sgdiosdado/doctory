import React, { useState } from 'react';
import { Box, Image, Tabs, TabList, Tab, TabPanel, TabPanels, VStack } from '@chakra-ui/react';

import { PatientsTable } from './PatientsTable'
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';



export const MedicHomeView = () => {
  const [patients, setPatients] = useState([])
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
