import React, { Dispatch, SetStateAction } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react"
import { UserInformation} from '../../http/types';
import { useForm } from 'react-hook-form';
import { isValidDate } from '../../utils/utils';
import { InputArrType, sexTypes, userTypes } from '../../utils/typesDefinitions';
import { ArrInput } from './ArrInput';

type ProfileFormProps = {
  formId: string;
  onSubmit: (values:UserInformation) => void;
  data: UserInformation;
  onOpenDrawer: () => void;
  isLoading: boolean;
  allergies: InputArrType;
  setAllergies: Dispatch<SetStateAction<InputArrType>>;
  specialties: InputArrType;
  setSpecialities: Dispatch<SetStateAction<InputArrType>>;
}

export const ProfileForm = ({
  formId,
  onSubmit,
  data,
  allergies,
  setAllergies,
  specialties,
  setSpecialities,
  onOpenDrawer,
  isLoading,
}:ProfileFormProps) => {

  const { register, handleSubmit, errors, setValue } = useForm<UserInformation>();

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        mb={4}
        isRequired
        isInvalid={Boolean(errors.first_name)}>
        <FormLabel htmlFor='first_name'>Nombre(s)</FormLabel>
        <Input
          name='first_name'
          type='text'
          autoComplete='on'
          placeholder='Juan'
          defaultValue={data.first_name}
          ref={register({ required: 'El nombre es obligatorio' })}
        />
        <FormErrorMessage>
          {errors.first_name && errors.first_name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        mb={4}
        isRequired
        isInvalid={Boolean(errors.last_name)}>
        <FormLabel htmlFor='last_name'>Apellidos</FormLabel>
        <Input
          name='last_name'
          type='text'
          autoComplete='on'
          placeholder='Pérez'
          defaultValue={data.last_name}
          ref={register({ required: 'El apellido es obligatorio' })}
        />
        <FormErrorMessage>
          {errors.last_name && errors.last_name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        mb={4}
        isRequired
        isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor='email'>Correo</FormLabel>
        <Input
          name='email'
          type='email'
          disabled={true}
          placeholder='ejemplo@gmail.com'
          value={data.email}
          ref={register}
        />
        
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        mb={4}>
        <FormLabel>Contraseña</FormLabel>
        <Button onClick={onOpenDrawer} variant='link' colorScheme='primary'>Cambiar contraseña</Button>
      </FormControl>
      
      <FormControl
        mb={4}
        isRequired
        isInvalid={Boolean(errors.dob)}>
        <FormLabel htmlFor='dob'>Fecha de nacimiento</FormLabel>
        <Input
          name='dob'
          type='date'
          autoComplete='on'
          defaultValue={data.dob}
          ref={register({
            required: 'La fecha es obligatoria',
            validate: value => isValidDate(value) || 'La fecha no es válida',
            })}
        />
        <FormErrorMessage>
        {errors.dob && errors.dob.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        mb={4}>
        <FormLabel htmlFor='sex'>Sexo</FormLabel>
          {data.sex && 
          <Select
            as='select'
            name='sex'
            defaultValue={data.sex}
            onChange= {(e) => setValue('sex', e.target.value)}
            ref={register}
          >
            {sexTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>}
      </FormControl>
      
      <FormControl
        mb={4}
      >
        <FormLabel htmlFor='location'>Lugar de Residencia</FormLabel>
        <Input
          name='location'
          type='text'
          autoComplete='on'
          placeholder='Monterrey, Nuevo León'
          defaultValue={data.location}
          ref={register}
        />
      </FormControl>
      
      <FormControl mb={4}>
        <FormLabel htmlFor='blood_type'>Tipo de Sangre</FormLabel>
        <Input
          name='blood_type'
          type='text'
          autoComplete='on'
          placeholder='O+'
          defaultValue={data.blood_type || ''}
          ref={register}
        />
      </FormControl>

      {data.type.includes(userTypes.MEDIC) &&
        <FormControl mb={4}>
          <FormLabel htmlFor='license'>Cédula Profesional</FormLabel>
          <Input
            name='license'
            type='text'
            placeholder='12345678'
            defaultValue={data.license || ''}
            ref={register}
          />
        </FormControl>
      }

      {data.type.includes(userTypes.MEDIC) &&
        <ArrInput
          labelText='Specialidad(es)'
          data={specialties}
          setData={setSpecialities}
        />
      }
      
      <ArrInput
        labelText='Alergia(s)'
        data={allergies}
        setData={setAllergies}
      />
      
      <Stack  w={'100%'} align='flex-end'>
        <Button 
          isLoading={isLoading}
          colorScheme='primary'
          type="submit"
        >
          Guardar
        </Button>
      </Stack>
    </form>
  )
}
