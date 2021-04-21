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
        <Box maxW={{base:'30%', md:'20%'}}>
          <Image borderRadius="full" maxH={'15em'} src={avatar}/>
        </Box>
        <Box 
          maxW={{base:'60%', md:'70%'}}
          textAlign='left' 
          fontSize={{base:'sm', md:'xl'}}
          whiteSpace='nowrap' 
        >
          <Text 
            textOverflow='ellipsis'
            overflow='hidden' 
            fontSize={{base:'md', md:'3xl'}}
          >
            {userData.first_name + ' ' + userData.first_name}
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
