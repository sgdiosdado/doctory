import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { ConditionData } from '../../http/types';

type ConditionsTableProps = {
  conditions: ConditionData[];
}

export const ConditionsTable = ({ conditions }:ConditionsTableProps) => {
  return (
    <Table variant="striped" width={{lg:'150%'}} ml={{lg:'-25%'}}>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Descripción</Th>
          <Th>Fecha de diagnóstico</Th>
          <Th>Tipo de condición</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          conditions.map((condition:ConditionData) => (
            <Tr key={condition.id}>
              <Td>{condition.name}</Td>
              <Td>{condition.description}</Td>
              <Td>{condition.date_of_diagnosis}</Td>
              <Td>{condition.background_subtype_name}</Td>
            </Tr>
          ))
        }
      </Tbody>
    </Table>
  )
}