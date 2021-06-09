import React from 'react'
import theme from '@chakra-ui/theme'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { timeLineItemProps } from '../../utils/typesDefinitions'
import { useMediaQuery } from '@chakra-ui/media-query'

export const TimeLineItem = ({conditionTitle, date_of_diagnosis, conditionDescription}:timeLineItemProps) => {
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.md}`);
  return (
    <Box
      className='timeline-item'
      position='relative'
      d='flex'
      justifyContent='flex-end'
      paddingRight={`${isMobile? 'unset':'2em'}`} //distance between card and line
      paddingLeft={`${isMobile? '2em':'unset'}`} //distance between card and line
      m='.5em 0'
      width={`${isMobile? '100%':'50%'}`}
      sx={{
        ':nth-of-type(odd)': {
          alignSelf: 'flex-end',
          justifyContent: 'flex-start',
          paddingLeft: '2em', //distance between card and line
          paddingRight: '0',
        },
        ':nth-of-type(odd) .timeline-item-content':{
          textAlign: 'left',
          alignItems:'flex-start',
        },
        ':nth-of-type(odd) .timeline-item-content::after':{ //little triangle of cards
          right: 'auto',
          left: '-.5em'
        },
        ':nth-of-type(odd) .timeline-item-content .circle':{
          right: 'auto',
          left: '-2.5em', //distance form card to circle (paddingRight from card + half of circle's with)
        }
      }}
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
        textAlign={isMobile? 'left':'right'} 
        position='relative'
        sx={{
          '::after':{  //little triangle of cards
            content:`' '`,
            backgroundColor: useColorModeValue('white', 'gray.700'),
            position: 'absolute',
            top: 'calc(50% - 0.5em)',
            right: `${isMobile? 'unset':'-0.5em'}`,
            left: `${isMobile? '-.5em':'unset'}`,
            transform: 'rotate(45deg)',
            width: '1em',
            height: '1em',
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
        {/* Point of card in line */}
        <Box as='span' 
          className="circle" 
          bg={useColorModeValue('primary.500','primary.400')}
          borderRadius='50%'
          position='absolute'
          top='calc(50% - .5em)' //half of height
          w='1em'
          h='1em'
          right= {`${isMobile? 'unset':'-2.5em'}`} //distance form card to circle (paddingRight from card + half of circle's with)
          left={`${isMobile? '-2.5em':'unset'}`}
          zIndex='1' // circle on top from line
        />
      </VStack>
    </Box>
  )
}
