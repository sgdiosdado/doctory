import { Container, HStack, Stack } from '@chakra-ui/layout'
import { Skeleton, SkeletonCircle } from '@chakra-ui/skeleton'
import React from 'react'

export const PresentationSkeletonCard = ({isLoading}:{isLoading:boolean}) => {

  if (isLoading) {
    return (
      <Container>
        <HStack w='100%'  h='100%' >
          <Stack w='20%'>
            <SkeletonCircle size='4rem'/>
          </Stack>
          <Stack w='100%' >
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
          </Stack>
        </HStack>
      </Container>
    )
  } else {
    return <></>
  }

}
