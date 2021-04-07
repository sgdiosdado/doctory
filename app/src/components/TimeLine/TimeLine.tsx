import { Box, Container } from '@chakra-ui/layout'
import React, { FC } from 'react'
import './timelinestyles.css'

export const TimeLine:FC = ({children}) => {


  return (
    <Container
      
      w="100%"
      h="100%"
      maxW="100%"
      d={'flex'}
      flexDirection='column'
      flexGrow={1}
    >
      <Box
        className='timeline-container'

      >
        {children}
      </Box>
    </Container>
  )
}
