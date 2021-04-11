import { Box, Container, Flex, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { PresetationCard } from '../../components/PresentationCard';
import { userInformation, conditionTimeLine } from '../../utils/typesDefinitions';
import avatar from '../../assets/PowerPeople_Emma.png';
import { TimeLine } from '../../components/TimeLine/TimeLine';
import { TimeLineItem } from '../../components/TimeLine/TimeLineItem';
import { AddButton } from '../../components/TimeLine/AddButton';

export const PacientHomeView = () => {

  const userData: userInformation = {
    name: 'Sergio Gabriel',
    lname: 'Diosdado Castelazo',
    dob: '14-dic-1998',
    email: 'sergio@doctory.com',
    location: 'Matamoros, Tamaulipas'
  };
  const timeLineConditions:conditionTimeLine[] = [
    {title:'Apendicitis', date:'12-Feb-22',  description:'Fue una operación de emergencia, en la mañana me lo detectaron y después de un estudio urgente fue necesaria la operación'},
    {title:'Rinoplastia', date:'12-Feb-23', description:'En realidad nada más acomodaron el tabique'},
    {title:'Un título más largo Un título más largoUn título más largo', date:'12-Feb-23'},
  ];

  return (
    <Container
      w="100vw"
      h="100%"
      maxW="95%"
      d={'flex'}
      flexGrow={1}
      mx={{base:'1em', md:'2em'}}
    >
      <Flex
        flexGrow={1}
        align={'flex-start'}
        justify={'center'}
        pt={12}
        w={'100%'}
      >
        <VStack>
          <Text fontSize='4xl'>Historia Médica</Text>
          <PresetationCard userData={userData} avatar={avatar} />
          <Box
            w={'100%'}
          >
            <TimeLine>
              {timeLineConditions.map(condition => (
                <TimeLineItem 
                  conditionTitle={condition.title}
                  date_of_diagnosis={condition.date}
                  conditionDescription={condition.description}
                />
              ))}
            </TimeLine>
          </Box>
        </VStack>
          <Box 
            position='fixed'
            bottom='2em'
            right='2em'
          >
            <AddButton />
          </Box>
      </Flex>
    </Container>

  )
}
