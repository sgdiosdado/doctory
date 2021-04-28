import React, { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/layout';
import { PresetationCard } from '../../components/PresentationCard';
import { userInformation } from '../../utils/typesDefinitions';
import avatar from '../../assets/PowerPeople_Emma.png';
import { TimeLine } from '../../components/TimeLine/TimeLine';
import { TimeLineItem } from '../../components/TimeLine/TimeLineItem';
import { AddButton } from '../../components/TimeLine/AddButton';
import { NewConditionForm } from './NewConditionForm';
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useMediaQuery
} from '@chakra-ui/react';
import theme from '@chakra-ui/theme'
import { AddIcon } from '@chakra-ui/icons';
import { BackgroundSubtypeData, ConditionData, FunctionError, FunctionOk } from '../../http/types';
import { http } from '../../http/client';
import { useToast } from "@chakra-ui/react"
import { connectionErrorToast } from '../../utils/connectionErrorToast';


export const PatientHomeView = () => {

  const userData: userInformation = {
    name: 'Sergio Gabriel',
    lname: 'Diosdado Castelazo',
    dob: '14-dic-1998',
    email: 'sergio@doctory.com',
    location: 'Matamoros, Tamaulipas'
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.md}`); 

  const [backgroundSubtypes, setBackgroundSubtype] = useState<BackgroundSubtypeData[]>([])
  
  const [conditions, setConditions] = useState<ConditionData[]>([])

  const toast = useToast();

  const onSubmit = (values:ConditionData) => {
    const ok:FunctionOk = (_, data) => {
      const conds = [...conditions, data as ConditionData]
      conds.sort((x, y) => x.date_of_diagnosis < y.date_of_diagnosis ? 1 : -1)
      setConditions(conds)
      onClose();
      toast({
        title: 'Condición creada',
        description: 'Se ha añadido una nueva condición a tu historia clínica',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
        variant: 'left-accent'
      });
    }
    const error:FunctionError = (statusCode, error) => {
      console.log(error);
    }

    http.newCondition(values, ok, error, () => toast(connectionErrorToast()));
  }
  
  useEffect(() => {
    const ok:FunctionOk = (statusCode, data) => {
      const bs = data as BackgroundSubtypeData[];
      setBackgroundSubtype(bs)
    }
    http.backgroundSubtypes(ok)
  }, [])

  useEffect(() => {
    const ok:FunctionOk = (statusCode, data) => {
      const conds = data as ConditionData[];
      setConditions(conds)
    }
    http.conditions(ok)
  }, [])

  return (
    <>
      <VStack>
        <Text fontSize='4xl'>Historia Médica</Text>
        <PresetationCard userData={userData} avatar={avatar} />
        <Box
          maxW={{base: '100%', md: '75%'}}
        >
          <TimeLine>
            {conditions.map(condition => (
              <TimeLineItem 
                key={condition.id}
                conditionTitle={condition.name}
                date_of_diagnosis={condition.date_of_diagnosis}
                conditionDescription={condition.description}
              />
            ))}
          </TimeLine>
        </Box>
      </VStack>
      
      <Drawer 
        placement={isMobile ? 'bottom' : 'right'}
        isOpen={isOpen}
        onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton/>
              <DrawerHeader borderBottomWidth='1px'>
                Nueva condición
              </DrawerHeader>

              <DrawerBody>
                <NewConditionForm
                  onSubmit={onSubmit}
                  formId='form-condition'
                  backgroundSubtypes={backgroundSubtypes}/>
              </DrawerBody>
              
              <DrawerFooter>
                <Button
                  type='submit'
                  form='form-condition'
                  leftIcon={<AddIcon/>}
                  colorScheme='primary'>Añadir</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
      </Drawer>
      <Box
        display='inline-block'
        ml='auto'
        mr='1rem'
        mb='1rem'
        position='sticky'
        bottom='1rem'
        onClick={onOpen}
      >
        <AddButton/>
      </Box>
    </>
  )
}
