import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

type PatientsTableProps = {
  conditions: any[];
};

export const PatientsTable = ({ patients }: PatientsTableProps) => {

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
            <Td>{patient.first_name + ' ' + patient.last_name}</Td>
            <Td>{patient.dob}</Td>
            <Td>{patient.blood_type}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
