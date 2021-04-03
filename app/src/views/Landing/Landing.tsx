import React from 'react';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container, Flex, Heading, HStack, List, ListIcon, ListItem, Stack, Text, VStack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';
import DoctorWithPhoneImage from '../../assets/DoctorWithPhoneImage.svg';
import GroupOfDoctorImage from '../../assets/GroupOfDoctorImage.svg';
import PersonWithComputerImage from '../../assets/PersonWithComputerImage.svg';
import { CheckIcon } from '@chakra-ui/icons';

const bulletList = [{
  title: 'Con una cuenta de paciente:',
  listItems: [
    'Administrar tu historia médica',
    'Compartir tu historia médica con tu doctor',
    'Organizar tus estudios médicos'
  ]
},
{
  title: 'Con una cuenta de doctor:',
  listItems: [
    'Ver las historias médicas de tus pacientes',
    'Organizar las notas de tus pacientes',
    'Administrar tu historia médica',
    'Organizar tus estudios médicos'
  ]
}, 
]

export const Landing = () => {

const landingImage = useBreakpointValue({ base: DoctorWithPhoneImage, md: DoctorsInComputerImage })

  return (
    <Container
      w="100vw"
      h="100%"
      maxW="95%"
      d={'flex'}
      flexGrow={1}
      mx={{base:'1em', md:'2em'}}
    >
      <Flex
        flexGrow={1}
        align={'flex-start'}
        justify={'center'}
        py={12}
        w={'100%'}
      >
        <VStack align="stretch" spacing={{base: '5em', md:'10em'}} w={'100%'}>
          {/**************  1st Section **************/}
          <HStack w={'100%'} justifyContent='center' spacing={'1em'}>
            <Box  w={'55%'} maxW='60em' align='center'>
              <Image src={landingImage} alt={'Doctory'}/>
            </Box>
            <Box w={'40%'} maxW={{sm:'xs', md:'sm', xl:'md'}} align='center'>
                <Heading as='h1' 
                  mb={{base:'1em', lg:'2em'}} 
                  fontSize={{base:'2xl', md:'4xl', lg:'6xl'}}
                  color={useColorModeValue('primary.500', 'white')}
                >
                  Doctory
                </Heading>
              <Text fontSize={['xl', '2xl', '3xl', '4xl']} mb={'2em'} textAlign='left' fontWeight='medium'>
                Administra tu historia clínica y compartela con tu doctor
              </Text>
              <Box textAlign='center' w='50%' >
                <Button size={'lg'} isFullWidth colorScheme={'primary'} >
                  Unirse
                </Button>
              </Box>
            </Box>
          </HStack>
          {/**************  2nd Section **************/}
          <HStack w={'100%'} justifyContent='center' spacing={{base:'1em', md:'3em'}}>
            <Box  w={{base:'100%', md:'xl'}} align='center'>
              <Image src={GroupOfDoctorImage} alt={'Doctory'}/>
            </Box>
            <Box maxW={{base:'sm', md:'md'}} align='center'>
              <Text fontSize={['xl', '2xl', '3xl', '4xl']} textAlign='left' fontWeight='normal'>
                Tu información es segura y confidencial, tú decides con quien la compartes
              </Text>
            </Box>
          </HStack>
          {/**************  3rd Section **************/}
          <Box>
          <Text fontSize={['2xl', '3xl', '4xl', '5xl']} mb={'2em'} textAlign='center' fontWeight='medium'>
           <Text as={'span'} color={useColorModeValue('primary.500', 'white')}>Doctory</Text> funciona para doctores y pacientes
          </Text>
          <Stack justifyContent='center' alignItems='center' direction={{base:'column-reverse', md:'row'}}>
            <Box   maxW={'30em'} align='center' textAlign='left'>
              {bulletList.map(list => <>
                <Text fontWeight='medium' fontSize='lg' mb={'1em'}>{list.title}</Text>
                <List spacing={3} mb={'2.5em'}>
                {list.listItems.map(item => <>
                  <ListItem>
                    <ListIcon as={CheckIcon} color={'primary.400'} />
                      {item}
                  </ListItem>
                </>)}
                </List>
              </>)}            
            </Box>
            <Box w={'100%'} maxW={{base:'20em', lg:'35em'}} align='center'>
              <Image src={PersonWithComputerImage} w='75%' alt={'Doctory'} mb={'2em'}/>
            </Box>
          </Stack>
          </Box>
        </VStack>
      </Flex>
    </Container>
  )
}


