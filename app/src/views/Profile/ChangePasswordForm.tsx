import React, {useState, ChangeEvent} from 'react';
import { 
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
 } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { ValidPasswordChecklist } from '../AuthViews/validPasswordChecklist';
import { ChangePasswordData } from '../../http/types';


type ChangePasswordProps = {
  formId: string;
  onSubmit: SubmitHandler<ChangePasswordData>;
}

export const ChangePasswordForm = ({formId, onSubmit}:ChangePasswordProps) => {
  const { register, handleSubmit, errors } = useForm<ChangePasswordData>();
  const [initialPassword, setInitialPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const {
    isValid,
    hasValidLength,
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar } = usePasswordValidation({ password });
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setInitialPassword(true);
  }

  return (
    <Stack>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        mb='4'
        isInvalid={Boolean(initialPassword ? !isValid : null)}>
        <FormLabel htmlFor='password1'>Contraseña</FormLabel>
        <Input
          name='password1'
          type='password'
          autoComplete='off'
          placeholder='Contraseña segura'
          value={password}
          onChange={handlePasswordChange}
          ref={register({ required: true })}
          mb={4}
        />
        {!isValid && <ValidPasswordChecklist
          hasNumber={hasNumber}
          hasLowerCase={hasLowerCase}
          hasUpperCase={hasUpperCase}
          hasSpecialChar={hasSpecialChar}
          hasValidLength={hasValidLength} />}
      </FormControl>

      <FormControl
        mb={4}
        isInvalid={Boolean(errors.password2)}>
        <FormLabel htmlFor='password2'>
          Confirmar contraseña
        </FormLabel>
        <Input
          name='password2'
          type='password'
          autoComplete='off'
          placeholder='Repetir contraseña'
          onPaste={e => e.preventDefault()}
          ref={register({
            required: 'Es obligatorio confirmar la contraseña',
            validate: (value: string) => value === password || 'Las contraseñas no coinciden'
          })}
        />
        <FormErrorMessage>
          {errors.password2 && errors.password2.message}
        </FormErrorMessage>
      </FormControl>
      </form>

    </Stack>
  )
}