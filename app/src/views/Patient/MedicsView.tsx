import React, { useState  } from 'react'
import { Box, Image, VStack, ToastPosition, useToast, useBreakpointValue, useDisclosure, DrawerProps, Icon } from '@chakra-ui/react'
import { userInformation, ShareData } from '../../http/types';
import { http } from '../../http/client';
import { useQuery, useMutation } from 'react-query';
import { MedicsTable } from '../Patient/MedicsTable';
import { TableSkeleton } from '../../components/TableSkeleton';
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';
import { ActionButton } from '../../components/ActionButton';
import { buttonSubmit, HomeDrawer } from '../../components/HomeDrawer';
import { ShareHistoryForm } from '../Patient/ShareHistoryForm';
import { MdShare } from "react-icons/md"
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export const MedicsView = () => {
  const toast = useToast();
  const toastPosition = useBreakpointValue({base:'top', md:'top-right'});
  const [medics, setMedics] = useState<userInformation[]>([])
  const [id_medic, setId] = useState<number | null>()
  const { isOpen, onOpen, onClose } = useDisclosure() 
  const drawerPlacement = useBreakpointValue({base: 'bottom', lg: 'right'});
  const [drawerContent, setDrawerContent] = useState<{headerText: string, Form: ReactJSXElement, buttonProps: buttonSubmit}>({
    headerText: '',
    Form: <></>,
    buttonProps: {} as buttonSubmit,
  })
  

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
    onError,
    //notifyOnChangeProps: ['data']
  })

  const successDelete = () => {
    const newMedics = medics.filter((medic) => medic.id !== id_medic);
    setMedics(newMedics)
    toast({
      title: 'Médico eliminado',
      description: 'Se ha dejado de compartir tu historia clínica',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }

  const { mutate: mutateDeleteMedic } = useMutation('deleteMedic', (id:number | null) => http.removeShare(id), {onSuccess: successDelete, onError})

  const deleteMedic = (id:number | null) => {
    mutateDeleteMedic(id)
    setId(id)
  }

  const onSuccessShareHistory = () => {
    onClose();
    toast({
      title: 'Hisoria clínica compartida',
      description: 'Se ha compartido tu historia clínica',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: toastPosition as ToastPosition,
    });
  }

  const { mutate: mutateShareHistory } = useMutation('shareHistory', (values:ShareData) => http.shareHistory(values), {onSuccess: onSuccessShareHistory, onError})

  const onSubmitShare = (values:ShareData) => {
    mutateShareHistory(values)
  }

  const onOpenShare = () => {
    setDrawerContent({
      headerText: 'Compartir historia clínica',
      Form: <ShareHistoryForm
        onSubmit={onSubmitShare}
        formId='form-share'/>,
      buttonProps: {
        formId: 'form-share',
        icon: <Icon as={MdShare}/>,
        text: 'Compartir',
      }
    })
    onOpen()
  }

  


  return (
    <>
    <VStack>
      <Image 
        maxH='15rem'
        src={DoctorsInComputerImage} />
      <Box
        w='100%'
        pt='2rem'
        maxW={{base: '100%', md: '75%', lg: '50%'}} 
        overflowX={{base: 'scroll', lg: 'visible'}}>
        {isMedicsFetched && <MedicsTable medics={medics} deleteMedic={deleteMedic} />}
        <TableSkeleton isLoading={!isMedicsFetched} />
      </Box>
    </VStack>
    <HomeDrawer
    onClose={onClose}
    isOpen={isOpen}
    drawerPlacement={drawerPlacement as DrawerProps['placement']}
    {...drawerContent}
  />
  <Box
        display='inline-block'
        ml='auto'
        mr='1rem'
        mb='1rem'
        position='sticky'
        bottom='4rem'
        right='1rem'
        onClick={onOpenShare}
      >
        <ActionButton icon={MdShare} />
      </Box>
  </>
  )
}