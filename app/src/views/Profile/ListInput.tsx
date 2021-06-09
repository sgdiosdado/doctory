import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Icon, Input } from '@chakra-ui/react'
import { Allergy, Specialty } from '../../http/types'
import { InputArrType } from '../../utils/typesDefinitions'

type ListProps = {
  value: Allergy | Specialty;
  setData: Dispatch<SetStateAction<InputArrType>>;
  disabled?: boolean;
}

export const ListInput = ({value, setData, disabled=false}:ListProps) => {
  const [toBeDeleted, setToBeDeleted] = useState(true);

  const actionIcon = {
    icon: toBeDeleted? DeleteIcon : RepeatIcon,
    colorScheme: toBeDeleted? 'red' : 'blue'
  }

  const onClick = () => {
    if (!toBeDeleted) {
      setToBeDeleted(x => !x);
      setData(oldData => ({
        ...oldData, 
        toBeDeleted: oldData.toBeDeleted.filter(x => x.id !== value.id) 
      }))
    }else {
      setToBeDeleted(x => !x);
      setData(oldData => ({
        ...oldData, 
        toBeDeleted: [...oldData.toBeDeleted, value] 
      }))
    }
    
  }
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(oldData => {
      let newToBeAdded = oldData.toBeAdded;
      newToBeAdded[value.id - 1] = {id: value.id, name: e.target.value};
      
      return {
      ...oldData,
      toBeAdded: newToBeAdded
      }
    })
  }

  const toBeDeletedSyles = {
    textDecoration: toBeDeleted? 'none' : 'line-through'
  }

  return (
    <div>
      <HStack mb={2} >
        <Box 
          bg= 'currentcolor'
          borderRadius= '50%'
          w='5px'
          h='5px'
          mx='.5em'
        />
        <Input
          style={toBeDeletedSyles}
          value={value.name}
          disabled={disabled}
          onChange={handleInputChange}
          size='sm'
          type='text'
        />
        {disabled &&
          <Button 
            variant='ghost' 
            colorScheme={actionIcon.colorScheme}
            size="sm" 
            onClick={onClick}
          >
            <Icon 
              as={actionIcon.icon}
            />
          </Button>
        }
      </HStack>
    </div>
  )
}
