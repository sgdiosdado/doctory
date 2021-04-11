import { useColorModeValue } from '@chakra-ui/color-mode'
import { AddIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import React from 'react'

export const AddButton = () => {
  return (
      <Box
        bg={useColorModeValue('primary.500', 'primary.200')}
        rounded='50%'
        cursor='pointer'
        _hover={{
          bg:useColorModeValue('primary.300', 'primary.300')
        }}
      >
        <AddIcon 
          w='2em'
          h='2em'
          p='.5em'
          color='white'
        />
      </Box>
  )
}
