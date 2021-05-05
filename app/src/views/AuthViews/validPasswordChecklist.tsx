import React from 'react'
import { CheckIcon } from '@chakra-ui/icons'
import { List, ListItem, ListIcon, useColorModeValue } from '@chakra-ui/react'

type passwordChecklistPropsTypes = {
  hasNumber: boolean,
  hasUpperCase: boolean,
  hasLowerCase: boolean,
  hasSpecialChar: boolean,
  hasValidLength: boolean
}

export const ValidPasswordChecklist = ({
  hasNumber,
  hasUpperCase,
  hasLowerCase,
  hasSpecialChar,
  hasValidLength,
}: passwordChecklistPropsTypes) => {
  const iconStates = {
    valid: 'green.500',
    invalid: 'gray.500',
  }
  const textStates = {
    valid: useColorModeValue('gray.800','gray.100'),
    invalid: 'gray.500',
  }
  return (
    <List fontSize={'0.75em'} spacing={2}>
      <ListItem
        color={hasNumber ? textStates.valid : textStates.invalid}
        display='flex'
        alignItems='center'
      >
        <ListIcon
          as={CheckIcon}
          color={hasNumber ? iconStates.valid : iconStates.invalid}
        />
        Contiene un número
      </ListItem>
      <ListItem
        color={hasUpperCase ? textStates.valid : textStates.invalid}
        display='flex'
        alignItems='center'
      >
        <ListIcon
          as={CheckIcon}
          color={hasUpperCase ? iconStates.valid : iconStates.invalid}
        />
        Contiene una mayúscula
      </ListItem>
      <ListItem
        color={hasLowerCase ? textStates.valid : textStates.invalid}
        display='flex'
        alignItems='center'
      >
        <ListIcon
          as={CheckIcon}
          color={hasLowerCase ? iconStates.valid : iconStates.invalid}
        />
        Contiene una minúscula
      </ListItem>
      <ListItem
        color={hasSpecialChar ? textStates.valid : textStates.invalid}
        display='flex'
        alignItems='center'
      >
        <ListIcon
          as={CheckIcon}
          color={hasSpecialChar ? iconStates.valid : iconStates.invalid}
        />
        Contiene un caracter especial
      </ListItem>
      <ListItem
        color={hasValidLength ? textStates.valid : textStates.invalid}
        display='flex'
        alignItems='center'
      >
        <ListIcon
          as={CheckIcon}
          color={hasValidLength ? iconStates.valid : iconStates.invalid}
        />
        Contiene mínimo 8 caracteres
      </ListItem>
    </List>
  )
}
