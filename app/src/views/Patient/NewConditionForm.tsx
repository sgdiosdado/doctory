import React from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Select
} from '@chakra-ui/react';
import { BackgroundSubtypeData, ConditionData } from '../../http/types';
import { useForm } from 'react-hook-form';
import { isValidDate } from '../../utils/utils';

type NewConditionProps = {
  formId: string;
  onSubmit: (values:ConditionData) => void;
  backgroundSubtypes: BackgroundSubtypeData[];
}

export const NewConditionForm = ({ formId, onSubmit, backgroundSubtypes }: NewConditionProps) => {
  const { register, handleSubmit, errors } = useForm<ConditionData>();

  return (
    <Stack>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isRequired
          mb='4'
          isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            name="name"
            type="text"
            autoComplete='on'
            placeholder='Diabetes tipo 1'
            ref={register({required: 'El nombre es obligatorio'})}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb='4' isInvalid={Boolean(errors.description)}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            name="description"
            placeholder='Descripción de la condición'
            ref={register()}
            size="sm"
          />
        </FormControl>
        <FormControl
          isRequired
          mb='4'
          isInvalid={Boolean(errors.background_subtype)}>
          <FormLabel htmlFor="background_subtype">Tipo de condición</FormLabel>
          <Select
            name="background_subtype"
            ref={register()}>
            {backgroundSubtypes.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </Select>
        </FormControl>
        <FormControl
          isRequired
          mb='4'
          isInvalid={Boolean(errors.date_of_diagnosis)}>
          <FormLabel htmlFor="date_of_diagnosis">Fecha de diagnóstico</FormLabel>
          <Input
            name="date_of_diagnosis"
            type="date"
            autoComplete='on'
            ref={register({
              required: 'La fecha es obligatoria',
              validate: value => isValidDate(value) || 'La fecha no es válida'
            })}/>
          <FormErrorMessage>
            {errors.date_of_diagnosis && errors.date_of_diagnosis.message}
          </FormErrorMessage>
        </FormControl>
      </form>
    </Stack>
  )
}