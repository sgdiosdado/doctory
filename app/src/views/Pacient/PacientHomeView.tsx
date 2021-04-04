import { Container, Flex, Text } from '@chakra-ui/layout'
import React from 'react'

export const PacientHomeView = () => {
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
        <Text fontSize='4xl'>Buen día</Text>
      </Flex>
    </Container>

  )
}
