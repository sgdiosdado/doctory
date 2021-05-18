import { Container, HStack, VStack } from '@chakra-ui/layout'
import { Box, theme, useMediaQuery } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton'
import React from 'react'

export const TimeLineSkeleton = ({isLoading}:{isLoading:boolean}) => {
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.md}`);
  const numElements = 5;
  const items = [];
  
  for (let index = 0; index < numElements; index++) {
    items.push(
      <HStack key={index} w='100%' justifyContent={(index % 2 === 0) ? 'flex-end' : 'flex-start'}>
          <Box width={`${isMobile? '100%':'50%'}`} >
            <Skeleton  height='5rem' />
          </Box>
      </HStack>
    )    
  }

  if(isLoading) {
    return (
      <Container>
        <VStack w='100%'>
          {items}
        </VStack>
      </Container>
    )
  }else {
    return <></>
  }
  
}
