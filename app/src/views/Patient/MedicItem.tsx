import React from 'react';
import { Td, Tr, Box, useDisclosure, Button, Icon } from '@chakra-ui/react';
import { userInformation } from '../../http/types';
import { DeleteIcon } from '@chakra-ui/icons';

type MedicItemProps = {
  medic: userInformation;
};

export const MedicItem = ({ medic }: MedicItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()





  return (
    <Tr key={medic.id}>
      <Td> {/*onClick={onOpen}>*/}
        {medic.first_name + ' ' + medic.last_name}
      </Td>
      <Td> {/*onClick={onOpen}>*/} {(medic.medic?.specialties.length == 0 ? ('-')
        :
        (medic.medic?.specialties.map((specialty) =>
          `${specialty.name}`
        ).join(', ')))}
      </Td>
      <Td> {/*onClick={onOpen}>*/} {medic.medic?.license || '-'}</Td>
      <Td> {/*width={isOpen ? "auto" : "0"} hidden={!isOpen}>*/}
      <Button colorScheme='red' size="md" onClick={onClose}><Icon 
        w='2em'
        h='2em'
        p='.5em'
        color='white'
        as={DeleteIcon}
      /></Button></Td>
    </Tr> 
    

  );
};
