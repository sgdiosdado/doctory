import React, { FC } from 'react'
import theme from '@chakra-ui/theme'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Container } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'


export const TimeLine:FC = ({children}) => {

  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.md}`);

  return (
    <Container
      w="100%"
      h="100%"
      maxW="100%"
      d={'flex'}
      flexDirection='column'
      flexGrow={1}
      pb='0'
    >
      <Box
        className='timeline-container'
        d='flex'
        flexDirection='column'
        position='relative'
        my='2em'
        mb='0'
        pb='2em'
        sx={{
          '::after':{
            backgroundColor: useColorModeValue('primary.500','primary.800'),
            content:'""',
            position: 'absolute',
            left: `${isMobile? '-.1em': 'calc(50% - .1em)'}`, //(50% - 1/2(with))
            width: '.2em',  //line with
            height: '100%',
          }
        }}
      >
        {children}
      </Box>
    </Container>
  )
}
