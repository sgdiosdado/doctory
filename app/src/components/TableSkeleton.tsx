import { Box, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'

export const TableSkeleton = ({isLoading}:{isLoading:boolean}) => {
  const numElements = 5;
  const items = [];
  
  for (let index = 0; index < numElements; index++) {
    items.push(
      <Box key={index} width='100%'>
        <Skeleton height='3rem' />
      </Box>
    )    
  }
  

  if (isLoading) {
    return (
      <VStack width={{base:'100%', lg:'150%'}} ml={{lg:'-25%'}}>
        {items}
      </VStack>
    )
  } else {
    return <></>
  }

}
