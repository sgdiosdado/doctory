import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, ListItem, useColorModeValue } from '@chakra-ui/react';
import { userInformation } from '../../http/types';
import { EmptyState } from '../../components/EmptyState';

type MedicsTableProps = {
  medics: userInformation[];
};

export const MedicsTable = ({ medics }: MedicsTableProps) => {
  const linkColor = useColorModeValue('blue.600', 'blue.400');
  
  if(medics.length === 0){
    return <EmptyState text='Sin médicos' />
  }

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Especialidades</Th>
          <Th>Licencia</Th>
        </Tr>
      </Thead>
      <Tbody>
        {medics.map((medic) => (
          <Tr key={medic.id}>
            <Td>
              {medic.first_name + ' ' + medic.last_name}
            </Td>
            <Td>{(medic.medic?.specialties == undefined ? ('-') 
            : 
            (medic.medic?.specialties.map((speciality) =>
            <ListItem>{speciality}</ListItem>
            )))}
              </Td>
            <Td>{medic.medic?.license || '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
