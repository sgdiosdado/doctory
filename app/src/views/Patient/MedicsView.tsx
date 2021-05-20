import React, { useContext, useState  } from 'react'
import { Box, Image, VStack, ToastPosition, useDisclosure, useToast, useBreakpointValue} from '@chakra-ui/react'
import { userInformation } from '../../http/types';
import { http } from '../../http/client';
import { useQuery, useMutation, queryCache } from 'react-query';
import { MedicsTable } from '../Patient/MedicsTable';
import { UserContext } from '../../provider/AuthProvider';
import { useParams } from 'react-router-dom';
import { TableSkeleton } from '../../components/TableSkeleton';
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';


export const MedicsView = () => {
  const { authContext } = useContext(UserContext)
  const toast = useToast();
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
  const { mutate: mutateDeleteMedic } = useMutation('deleteMedic', (id:number | undefined) => http.removeShare(id), {onSuccess: () => queryCache.refetchQueries('medics'), onError})

  return (
    <VStack>
      <Image 
        maxH='15rem'
        src={DoctorsInComputerImage} />
      <Box
        w='100%'
        pt='2rem'
        maxW={{base: '100%', md: '75%', lg: '50%'}} 
        overflowX={{base: 'scroll', lg: 'visible'}}>
      {isMedicsFetched && <MedicsTable medics={medics} deleteMedic={mutateDeleteMedic} />}
      <TableSkeleton isLoading={!isMedicsFetched} />
      </Box>
    </VStack>
  )
}