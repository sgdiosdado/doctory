import React, { useContext, useState  } from 'react'
import { Link } from "react-router-dom";
import { VStack, ToastPosition, useDisclosure, useToast, useBreakpointValue} from '@chakra-ui/react'
import { userInformation } from '../../http/types';
import { http } from '../../http/client';
import { useMutation, useQuery } from 'react-query';
import { MedicsTable } from '../Patient/MedicsTable';
import { UserContext } from '../../provider/AuthProvider';
import { useParams } from 'react-router-dom';
import { TableSkeleton } from '../../components/TableSkeleton';


export const MedicsView = () => {
  const { authContext } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const {id: medicId} = useParams<{id:string}>();
  const [medics, setMedics] = useState<userInformation[]>([])
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});

  const onError = (data:Error) => {
    if(data.message === 'Failed to fetch') data.message = 'Comprueba tu conexión a internet e intenta de nuevo.'
    toast({
      title: 'Ups!',
      description: data.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }

  const {isFetchedAfterMount: isMedicsFetched} = useQuery('medics', () => http.getMedics(), {
    onSuccess: (data:userInformation[]) => setMedics(data),
    onError
  })

  return (
    <VStack flexGrow={1} justifyContent='center'>
      {isMedicsFetched && <MedicsTable medics={medics} />}
      <TableSkeleton isLoading={!isMedicsFetched} />
    </VStack>
  )
}