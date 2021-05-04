import { Container, Stack, Text } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import React from 'react'

export const LoadingView = () => {
  return (
    <Container
      w="100%"
      h="100%"
      maxW="100%"
      d={'flex'}
      flexGrow={1}
      justifyContent='center'
      alignItems='center'
    >
      <Stack spacing='5' width='100%'>
        <Text fontSize="4xl" textAlign='center' >Doctory</Text>
        <Progress size="xs" isIndeterminate colorScheme='primary' />
      </Stack>
    </Container>
  )
}
