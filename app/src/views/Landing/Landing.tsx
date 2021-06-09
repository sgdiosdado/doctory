import React from 'react';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container, Flex, Heading, HStack, List, ListIcon, ListItem, Stack, Text, VStack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import SecureImage from '../../assets/SecureImage.svg';
import DoctorsInComputerImage from '../../assets/DoctorsInComputerImage.svg';
import DoctorWithPhoneImage from '../../assets/DoctorWithPhoneImage.svg';
import PresonInComputerImage from '../../assets/PresonInComputerImage.svg';

const bulletList = [{
  title: 'Con una cuenta de paciente:',
  listItems: [
    'Administra tu perfil',
    'Agrega tus condiciones',
    'Comparte tu historia médica con tu doctor',
  ]
},
{
  title: 'Con una cuenta de doctor:',
  listItems: [
    'Ve las historias médicas de tus pacientes',
    'Administra tu perfil',
    'Agrega tus condiciones',
    'Comparte tu historia médica con tu doctor',
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
          {/**************  Call to Action Section **************/}
          <HStack w={'100%'} justifyContent='center' spacing={'1em'}>
            <Box  w={'55%'} maxW='60em' align='center'>
              <Image src={landingImage} alt={'Doctory'}/>
            </Box>
            <Box w={'40%'} maxW={{sm:'xs', md:'sm', xl:'md'}} align='center'>
                <Heading as='h1' 
                  fontWeight='medium'
                  textAlign='left'
                  mb={{base:'1em', lg:'2em'}} 
                  fontSize={{base:'2xl', md:'4xl', lg:'6xl'}}
                  color={useColorModeValue('primary.500', 'white')}
                >
                  Doctory
                </Heading>
              <Text fontSize={['xl', '3xl', '4xl']} mb={'2em'} textAlign='left' fontWeight='normal'>
                Administra tu historia clínica y compartela con tu doctor
              </Text>
              <Box textAlign='center' w={['90%', '50%']} >
                <Link to={routes.signup.path}>
                  <Button size={'md'} isFullWidth colorScheme={'primary'} >
                    Unirse
                  </Button>
                </Link>
              </Box>
            </Box>
          </HStack>
          {/**************  Information is Secure Section **************/}
          <HStack w={'100%'} justifyContent='center' spacing={{base:'1em', md:'3em'}}>
            <Box  w={{base:'md', md:'xl'}} align='center'>
              <Image src={SecureImage} alt={'Doctory'}/>
            </Box>
            <Box maxW={{base:'md', md:'sm'}} align='center'>
              <Text fontSize={['xl', '3xl', '4xl']} textAlign='left' fontWeight='normal'>
                Tu información es segura y confidencial, tú decides con quien la compartes
              </Text>
            </Box>
          </HStack>
          {/************** Features Section **************/}
          <Box>
          <Text fontSize={['2xl', '3xl', '4xl', '5xl']} mb={'2em'} textAlign='center' fontWeight='medium'>
           <Text as={'span'} color={useColorModeValue('primary.500', 'white')}>Doctory</Text> funciona para doctores y pacientes
          </Text>
          <Stack justifyContent='center' alignItems='center' direction={{base:'column-reverse', md:'row'}}>
            <Box   maxW={'30em'} align='center' textAlign='left'>
              {bulletList.map((list,i) => <div key={i+list.title}>
                <Text key={'listTitle'+list.title} fontWeight='medium' fontSize='lg' mb={'1em'}>{list.title}</Text>
                <List key={'listSection'+list.title}  spacing={3} mb={'2.5em'}>
                {list.listItems.map((item, indx) => <div key={list.title+indx+item}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color={'primary.400'} />
                      {item}
                  </ListItem>
                </div>)}
                </List>
              </div>)}            
            </Box>
            <Box w={'100%'} maxW={{base:'20em', lg:'35em'}} align='center'>
              <Image src={PresonInComputerImage} w='75%' alt={'Doctory'} mb={'2em'}/>
            </Box>
          </Stack>
          </Box>
          {/**************  Call to Action Section **************/}
          <Box d={'flex'} justifyContent='center' w={'100%'}>
            <Box textAlign='center' w='sm' >
              <Link to={routes.signup.path}>
                <Button size={'lg'} isFullWidth colorScheme={'primary'} >
                  Unirse
                </Button>
              </Link>
            </Box>
          </Box>
        </VStack>
      </Flex>
    </Container>
  )
}


