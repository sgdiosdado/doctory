import React from 'react'
import { VStack, Text, useColorModeValue } from '@chakra-ui/react'

type emptyStateProps ={
  text: string
}

export const EmptyState = ({text}:emptyStateProps) => {
  
  return (
    <VStack flexGrow={1} justifyContent='center'>
      <Text textAlign='center' fontSize='4xl' my='4em' color={useColorModeValue('gray.600', 'gray.200')}>
        {text}
      </Text>
    </VStack>
  )
}
