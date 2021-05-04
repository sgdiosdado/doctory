import { Container, Flex, VStack, Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/react'
import React from 'react'
import { doctorInformation, patientInformation } from '../../utils/typesDefinitions';
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';


export const DoctorLandingView = () => {
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
            maxW="90%"
            d={'flex'}
            flexGrow={1}
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
                    <Image src={DoctorsInComputerImage} w='85%' alt={'Doctor'} mb={'2em'}/>
                    <Box textAlign='center' w={['90%', '50%']} >
                        <Link to={routes.doctorPatientsTable.path}>
                            <Button size={'md'} isFullWidth colorScheme={'primary'} >
                                Mis pacientes
                            </Button>
                        </Link>
                    </Box>
                </VStack>

            </Flex>
        </Container>

    )
}