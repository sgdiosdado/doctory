import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { UserInformation } from '../http/types'

type presentationCardPropsTypes = {
  userData: UserInformation,
  avatar?: string,
}

export const PresetationCard = ({userData, avatar}:presentationCardPropsTypes) => {
  
  return (
    <Box my='1rem'>
      <HStack maxW={'100%'}>
        <Box maxW={{base:'30%', md:'20%'}}>
          <Image borderRadius="full" maxH={'15em'} src={avatar}/>
        </Box>
        <Box 
          maxW={{base:'60%', md:'70%'}}
          textAlign='left' 
          fontSize={{base:'sm', md:'md'}}
          whiteSpace='nowrap' 
        >
          <Text 
            textOverflow='ellipsis'
            overflow='hidden' 
            fontSize={{base:'md', md:'2xl'}}
          >
            {userData.first_name + ' ' + userData.last_name}
          </Text>
          {userData.dob &&
            <Text>{userData.dob}</Text>
          }
          {userData.blood_type &&
            <Text>Tipo de sangre: {userData.blood_type}</Text>
          }
          {userData.location &&
            <Text textOverflow='ellipsis' overflow='hidden' >
              {userData.location}
            </Text>
          }
          {userData.allergies &&
            <Text textOverflow='ellipsis' overflow='hidden' >
              Alergias: {userData.allergies.map(x=>x.name).join(', ')}
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
