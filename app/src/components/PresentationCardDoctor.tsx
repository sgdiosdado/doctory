import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/layout'
import {doctorInformation} from '../utils/typesDefinitions'

type presentationCardPropsTypes = {
  userData: doctorInformation,
}

export const PresentationCardDoctor = ({userData}:presentationCardPropsTypes) => {
  
  return (
    <Box
      p='2em'
    >
      <HStack maxW={'70%'}>
        <Box maxW={{base:'60%', md:'70%'}}
          textAlign='left' 
          fontSize={{base:'2xl', md:'3xl'}}
          whiteSpace='nowrap' 
        >
          <Text>
            {'Buenos días\n' + userData.honorific + '. ' + userData.lname + ','}
          </Text>
          <Text fontSize='xl'>{'@'+userData.user} </Text>
        </Box>
      </HStack>
    </Box>
  )
}
