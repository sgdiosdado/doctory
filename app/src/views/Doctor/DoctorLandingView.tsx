import { Container, Flex, Text, VStack } from '@chakra-ui/layout';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import React from 'react'
import { PresentationCardDoctor } from '../../components/PresentationCardDoctor';
import { PatientTableItem } from '../../components/PatientTable/PatientTableItem';
import { doctorInformation, patientInformation } from '../../utils/typesDefinitions';


export const DoctorLandingView = () => {
    let dateTime = new Date()
    console.log("Date = " + dateTime);
    const userData: doctorInformation = {
        name: 'Arely',
        lname: 'Aceves',
        honorific: 'Dra',
        user: 'draarelya'
    };
    const patientsList: patientInformation[] = [
        {name: 'Raul', lname: 'Castellanos'},
        {name: 'Sergio', lname:'Diosado'},
        {name: 'Juan Pablo', lname:'Vargas'}
    ];
    /*
    <div>
          <h1>DOCTOR LANDING</h1>
          <h2>{dateTime}</h2> 
          <h2>HOLA</h2> 
      </div>
      */
    return (

        <Container
            w="100vw"
            h="100%"
            maxW="95%"
            d={'flex'}
            flexGrow={1}
            mx={{ base: '1em', md: '2em' }}
        >
            <Flex
                flexGrow={1}
                align={'flex-start'}
                justify={'center'}
                pt={12}
                w={'100%'}
            >
                <VStack>
                    <PresentationCardDoctor userData={userData} />
                    <Text fontSize='4xl'>Mis Pacientes</Text>
                    <Table>
                        <Th>Pacientes</Th>
                        {patientsList.map(patient => (
                            <Tr>
                            <PatientTableItem
                                userData={patient}
                            />
                            </Tr>
                        ))}
                    </Table>
                </VStack>

            </Flex>
        </Container>

    )
}