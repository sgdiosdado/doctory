import React from 'react'
import { Icon } from "@chakra-ui/icon";
import { Box, HStack, Text } from '@chakra-ui/layout'
import {patientInformation} from '../../utils/typesDefinitions'

type patientTableItemPropsTypes = {
  userData: patientInformation,
}

export const PatientTableItem = ({userData}:patientTableItemPropsTypes) => {
  
  return (
    <Box>
      <HStack>
        <Text>{userData.name + ' ' + userData.lname}</Text>
        <Icon name="arrow-forward"/>
      </HStack>
    </Box>
  )
}