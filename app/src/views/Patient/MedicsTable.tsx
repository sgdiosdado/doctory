import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, useDisclosure, Button, Icon} from '@chakra-ui/react';
import { userInformation } from '../../http/types';
import { EmptyState } from '../../components/EmptyState';
import { DeleteIcon } from '@chakra-ui/icons';
import { MedicItem } from '../Patient/MedicItem';

type MedicsTableProps = {
  medics: userInformation[];
  deleteMedic: (id:number | undefined) => void;
};

export const MedicsTable = ({ medics, deleteMedic }: MedicsTableProps) => {

  if(medics.length === 0){
    return <EmptyState text='Sin médicos' />
  }
  console.log(medics)
  return (
    <Table variant="striped" width={{lg:'150%'}} ml={{lg:'-25%'}}>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Especialidades</Th>
          <Th>Licencia</Th>
          <Th>Borrar</Th>
        </Tr>
      </Thead>
      <Tbody>
        { medics.map((medic) => (
          <Tr key={medic.id}>
          <Td>
            {medic.first_name + ' ' + medic.last_name}
          </Td>
          <Td> {(medic.medic?.specialties.length == 0 ? ('-')
            :
            (medic.medic?.specialties.map((specialty) =>
              `${specialty.name}`
            ).join(', ')))}
          </Td>
          <Td> {medic.medic?.license || '-'}</Td>
          <Td> 
          <Button key={medic.id} colorScheme='red' size="md" onClick={() => deleteMedic(medic.id)}><Icon 
            w='2em'
            h='2em'
            p='.5em'
            color='white'
            as={DeleteIcon}
          /></Button></Td>
        </Tr> 
        ))} 
      </Tbody>
    </Table>
  );
};
