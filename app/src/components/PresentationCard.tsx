import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, HStack, Text } from '@chakra-ui/layout'
<<<<<<< HEAD
import { userInformation } from '../http/types'
=======
>>>>>>> dd61765... Add new production docker compose and config files

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
            {userData.first_name + ' ' + userData.last_name}
          </Text>
          {userData.dob &&
            <Text>{userData.dob} </Text>
          }
          {userData.location &&
            <Text textOverflow='ellipsis' overflow='hidden' >
              {userData.location}
            </Text>
          }
          <Text textOverflow='ellipsis' overflow='hidden' >
            {userData.email}
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}
