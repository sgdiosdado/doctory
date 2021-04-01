import * as React from "react"
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
  } from '@chakra-ui/react'
  import {
    HamburgerIcon,
    CloseIcon,
  } from '@chakra-ui/icons'
import { MobileNavbar } from "./MobileNavbar";
import { DesktopNavbar } from "./DesktopNavbar";
import { ColorModeSwitcher } from "../../theme/ColorModeSwitcher";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

export const Navbar = ({userType}:any) => {  

  const { isOpen, onToggle } = useDisclosure();
  
  return (
    <Box>
      <Flex
        bg={useColorModeValue('primary.400','primary.800')}
        color='white'
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link to={routes.default.path}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              fontSize={'1em'}
              fontWeight={'bold'}
              color='white'
            >
              {/* TODO: replace for logo */}
              Doctory
            </Text>
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNavbar />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <ColorModeSwitcher display={{ base: 'none', md: 'flex' }}/>
          <Link to={routes.login.path} style={{marginLeft: '0'}}>
            <Button
              size={'md'}
              fontSize={'sm'}
              variant={'ghost'}
              as='button'
            >
              {/* TODO: when logged in, display none */}
              Iniciar sesión
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavbar closeNavbar={onToggle} />
      </Collapse>
    </Box>
  );
}
