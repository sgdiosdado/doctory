import { Box, Container, Flex, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import { PresetationCard } from '../../components/PresentationCard'
import { userInformation } from '../../utils/typesDefinitions'
import avatar from '../../assets/PowerPeople_Emma.png'
import { TimeLine } from '../../components/TimeLine/TimeLine'
import { TimeLineItem } from '../../components/TimeLine/TimeLineItem'

export const PacientHomeView = () => {

  const userData: userInformation = {
    name: 'Sergio Gabriel',
    lname: 'Diosdado Castelazo',
    dob: '14-dic-1998',
    email: 'sergio@doctory.com',
    location: 'Matamoros, Tamaulipas'
  }

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
        py={12}
        w={'100%'}
      >
        <VStack>
          <Text fontSize='4xl'>Historia Médica</Text>
          <PresetationCard userData={userData} avatar={avatar} />
          <Box
            w={'100%'}
          >
            <TimeLine>
              <TimeLineItem conditionTitle='Apendicitis Apendicitis Apendicitis Apendicitis Apendicitis Apendicitis Apendicitis Apendicitis' date_of_diagnosis='32-Ene-54'/>
              <TimeLineItem conditionTitle='Apendicitis' date_of_diagnosis='32-Ene-54' conditionDescription='Fue una hospitalización muy fea, duro mucho y estuve como un montón de tiempo en recuperación y drogandome todo los días. Luego un día algo paso y tuve que voler a ir con el doctor de algún nombre muy largo'/>
              <TimeLineItem conditionTitle='Apendicitis' date_of_diagnosis='32-Ene-54'/>
            </TimeLine>
          </Box>
        </VStack>
      </Flex>
    </Container>

  )
}
