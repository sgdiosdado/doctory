import { Container, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { PresetationCard } from '../../components/PresentationCard'
import { userInformation } from '../../utils/typesDefinitions'
import avatar from '../../assets/PowerPeople_Emma.png'

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
        <Text fontSize='4xl'>Historia Médica</Text>
        <PresetationCard userData={userData} avatar={avatar} />
      </Flex>
    </Container>

  )
}
