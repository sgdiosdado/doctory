import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, HStack, Text } from '@chakra-ui/layout'
import {userInformation} from '../utils/typesDefinitions'

type presentationCardPropsTypes = {
  userData: userInformation,
  avatar?: string,
}

export const PresetationCard = ({userData, avatar}:presentationCardPropsTypes) => {
  
  return (
    <Box>
      <HStack maxW={'100%'}>
        <Box maxW={{base:'35%', md:'30%'}}>
        <Image maxH={'30em'} src={avatar}/>
        </Box>
        <Box maxW={{base:'60%', md:'70%'}}
          textAlign='left' 
          fontSize={{base:'sm', md:'xl'}}
          whiteSpace='nowrap' 
        >
          <Text 
            textOverflow='ellipsis'
            overflow='hidden' 
            fontSize={{base:'md', md:'3xl'}}
          >
            {userData.name + ' ' + userData.lname}
          </Text>
          <Text>{userData.dob} </Text>
          <Text textOverflow='ellipsis' overflow='hidden' >
            {userData.location}
          </Text>
          <Text textOverflow='ellipsis' overflow='hidden' >
            {userData.email}
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}
