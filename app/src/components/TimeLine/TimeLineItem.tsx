import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { timeLineItemProps } from '../../utils/typesDefinitions'
import './timelinestyles.css'

export const TimeLineItem = ({conditionTitle, date_of_diagnosis, conditionDescription}:timeLineItemProps) => {
  return (
    <Box
      className='timeline-item'
      position='relative'
      d='flex'
      justifyContent='flex-end'
      paddingRight='2em'
      m='.5em 0'
      width='50%'
    >
      <VStack
        alignItems='flex-end'
        p='1em'
        spacing='0'
        className='timeline-item-content'
        boxShadow='lg'
        rounded='lg'
        bg={useColorModeValue('white', 'gray.700')}
        w='100%'
        textAlign='right'
        position='relative'
        sx={{
          '::after':{
            content:`' '`,
            backgroundColor: useColorModeValue('white', 'gray.700'),
            position: 'absolute',
            top: 'calc(50% - 0.5em)',
            right: '-0.5em',
            
          }
        }}
      >
        <Text 
          isTruncated
          noOfLines={1}
          whiteSpace='normal'
          fontSize='lg'
          fontWeight='medium'
          w='100%'
        >
          {conditionTitle}
        </Text>
        <Text 
          m={'0'}
          isTruncated
          noOfLines={1}
          whiteSpace='normal'
          fontSize='xs'
          fontWeight='medium'
          textAlign='right'
          w='100%'
        >
          {date_of_diagnosis}
        </Text>
        {conditionDescription &&
        <Text
          isTruncated
          noOfLines={3}
          whiteSpace='normal'
          fontSize='xs'
          fontWeight='normal'
          textAlign='left'
          w='100%'
        >
          {conditionDescription}
        </Text>}
        <span className="circle" />
      </VStack>
    </Box>
  )
}
