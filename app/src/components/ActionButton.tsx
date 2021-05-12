import React from 'react'
import { ComponentWithAs, IconProps, Icon } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { IconType } from 'react-icons/lib'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'

type actionButonProps = {
  icon?: IconType | ComponentWithAs<"svg", IconProps>
}

export const ActionButton = ({icon = AddIcon}:actionButonProps) => {
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
        as={icon}
      />
    </Box>
  )
}
