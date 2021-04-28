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
      <HStack maxW={'100%'}>
        <Box maxW={{base:'80%', md:'100%'}}
          textAlign='left' 
          fontSize={{base:'sm', md:'xl'}}
          whiteSpace='nowrap' 
        >
          <Text>Buenos días</Text>
          <Text 
            textOverflow='ellipsis'
            overflow='hidden' 
            fontSize='3x1'
          >
            {userData.honorific + '. ' + userData.lname + ','}
          </Text>
          <Text>{'@'+userData.user} </Text>
        </Box>
      </HStack>
    </Box>
  )
}
