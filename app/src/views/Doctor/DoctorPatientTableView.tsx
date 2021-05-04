import { Container, Flex, Text, VStack } from '@chakra-ui/layout';
import { Table, Tbody } from "@chakra-ui/react"
import React from 'react'
import { PresentationCardDoctor } from '../../components/PresentationCardDoctor';
import { PatientTableItem } from '../../components/PatientTable/PatientTableItem';
import { doctorInformation, patientInformation } from '../../utils/typesDefinitions';


export const DoctorPatientTableView = () => {
    const userData: doctorInformation = {
        name: 'Arely',
        lname: 'Aceves',
        honorific: 'Dra',
        user: 'draarelya'
    };
    const patientsList: patientInformation[] = [
        { id: '1', name: 'Raul', lname: 'Castellanos' },
        { id: '2', name: 'Sergio', lname: 'Diosado' },
        { id: '3', name: 'Juan Pablo', lname: 'Vargas' }
    ];
    return (

        <Container
            w="100vw"
            h="100%"
            maxW="80%"
            d={'flex'}
            flexGrow={1}
            justify={'center'}
            mx={{ base: '1em', md: '2em' }}
        >
            <Flex
                flexGrow={1}
                align={'flex-start'}
                justify={'center'}
                pt={12}
                w={'80%'}
            >
                <VStack>
                    <PresentationCardDoctor userData={userData} />
                    <Text fontSize='4xl'>Mis Pacientes</Text>
                    <Table variant="striped" colorScheme="gray">
                        <Tbody>
                            {patientsList.map(patient => (

                                <PatientTableItem
                                    userData={patient}
                                />

                            ))}
                        </Tbody>
                    </Table>
                </VStack>

            </Flex>
        </Container>

    )
}