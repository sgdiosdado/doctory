import React from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ShareData } from '../../http/types';
import { useForm } from 'react-hook-form';

type ShareHistoryProps = {
  formId: string;
  onSubmit: (values:ShareData) => void;
}

export const ShareHistoryForm = ({ formId, onSubmit}: ShareHistoryProps) => {
  const { register, handleSubmit, errors } = useForm<ShareData>();

  return (
    <Stack>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isRequired
          mb='4'
          isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">Correo del médico</FormLabel>
          <Input
            name="email"
            type="text"
            autoComplete='on'
            placeholder='medico@mail.com'
            ref={register({required: 'El correo electrónico del médico es obligatorio'})}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
      </form>
    </Stack>
  )
}