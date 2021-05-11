import { useColorModeValue } from '@chakra-ui/color-mode'
import { Icon } from "@chakra-ui/react"
import { MdShare } from "react-icons/md"
import { Box } from '@chakra-ui/layout'
import React from 'react'

export const ShareButton = () => {
  return (
      <Box
        bg={useColorModeValue('primary.500', 'primary.200')}
        rounded='50%'
        cursor='pointer'
        _hover={{
          bg:useColorModeValue('primary.300', 'primary.300')
        }}
      >
        <Icon 
          w='2em'
          h='2em'
          p='.5em'
          color='white'
          as={MdShare}
        />
      </Box>
  )
}
