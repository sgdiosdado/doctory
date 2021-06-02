import React, { Dispatch, SetStateAction } from 'react'
import { Button, FormControl, FormLabel } from '@chakra-ui/react'
import { ListInput } from './ListInput'
import { InputArrType } from '../../utils/typesDefinitions'
import { Allergy, Specialty } from '../../http/types'

type ArrInputProps = {
  labelText: string;
  data: InputArrType;
  setData: Dispatch<SetStateAction<InputArrType>>;
}

export const ArrInput = ({
  labelText,
  data,
  setData,
}: ArrInputProps) => {

  const addData = () => {
    const lastId = data.toBeAdded.length + 1;
    setData(oldData => ({...oldData, toBeAdded: [...oldData.toBeAdded, {id: lastId, name: ''}]}))
  } 

  return (
    <FormControl mb={4} >
      <FormLabel htmlFor='specialty'>{labelText}</FormLabel>
      {data.fetched.map((x: Allergy | Specialty) => (
        <ListInput 
          key={x.id}
          value={x}
          setData={setData}
          disabled
        />
      ))}
      {data.toBeAdded.map((x: Allergy | Specialty) => (
        <ListInput 
          key={x.id}
          value={x}
          setData={setData}
        />
      ))}
      <Button variant='outline' size="xs" isFullWidth colorScheme='gray' onClick={addData}>
        + Agregar
      </Button>
    </FormControl>
    )
}
