import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Button, Icon} from '@chakra-ui/react';
import { UserInformation } from '../../http/types';
import { EmptyState } from '../../components/EmptyState';
import { DeleteIcon } from '@chakra-ui/icons';

type MedicsTableProps = {
  medics: UserInformation[];
  deleteMedic: (id:number) => void;
};

export const MedicsTable = ({ medics, deleteMedic }: MedicsTableProps) => {

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
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        { medics.map((medic) => (
          <Tr key={medic.id}>
          <Td>
            {medic.first_name + ' ' + medic.last_name}
          </Td>
          <Td> {(medic.specialties.length === 0 ? ('-')
            :
            (medic.specialties.map((specialty) =>
              `${specialty.name}`
            ).join(', ')))}
          </Td>
          <Td> {medic.license || '-'}</Td>
          <Td> 
          <Button variant='outline' colorScheme='red'  size="md" onClick={() => deleteMedic(Number(medic.id))}><Icon 
            w='2em'
            h='2em'
            p='.5em'
            as={DeleteIcon}
          /></Button></Td>
        </Tr> 
        ))} 
      </Tbody>
    </Table>
  );
};
