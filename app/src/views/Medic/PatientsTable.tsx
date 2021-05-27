import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react';
import { UserInformation } from '../../http/types';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { EmptyState } from '../../components/EmptyState';

type PatientsTableProps = {
  patients: UserInformation[];
};

export const PatientsTable = ({ patients }: PatientsTableProps) => {
  const linkColor = useColorModeValue('blue.600', 'blue.400');
  
  if(patients.length === 0){
    return <EmptyState text='Sin pacientes' />
  }

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Edad</Th>
          <Th>Tipo de sangre</Th>
        </Tr>
      </Thead>
      <Tbody>
        {patients.map((patient) => (
          <Tr key={patient.id}>
            <Td>
              <ChakraLink 
                as={Link} 
                to={routes.patient.path.replace(':id', String(patient.id))}
                color={linkColor}
              >
              {patient.first_name + ' ' + patient.last_name}
              </ChakraLink>
            </Td>
            <Td>{patient.dob || '-'}</Td>
            <Td>{patient.blood_type || '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
