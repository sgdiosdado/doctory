import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import {
    Box,
    Flex,
    IconButton,
    Button,
    Stack,
    Collapse,
    useDisclosure,
    Link as ChackraLink,
    useColorModeValue
  } from '@chakra-ui/react'
  import {
    HamburgerIcon,
    CloseIcon,
  } from '@chakra-ui/icons'
  import { ColorModeSwitcher } from "../../theme/ColorModeSwitcher";
  import { UserContext } from '../../provider/AuthProvider';
import { routes } from "../../routes/routes";
import { userTypes } from '../../utils/typesDefinitions';

type NavItem = {
  label: string;
  path: string;
}

export const Navbar = () => {
  const { authContext, logout } = useContext(UserContext)
  const { isOpen, onToggle } = useDisclosure();
  const [navbarItems, setNavbarItems] = useState<NavItem[]>([]);
  const [homePath, setHomePath] = useState('/')
  const mobileContainerHover = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const loggedInItems:NavItem[] = [
      {label: 'Perfil', path: routes.profile.path},
    ];
    const loggedOutItems:NavItem[] = [];

    if (authContext.isLoggedIn) {
      setHomePath(routes.home.path);
      if(authContext.type?.includes(userTypes.MEDIC)){
        setHomePath(routes.medic.path)
        loggedInItems.push({label:'Mis condiciones', path:routes.home.path})
      }
      setNavbarItems(loggedInItems);
    }else{
      setHomePath(routes.default.path)
      setNavbarItems(loggedOutItems);
    }
  }, [authContext])

  return (
    <Box>
      <Flex
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
            <ChackraLink
              as={Link}
              to={homePath}
              fontFamily={'heading'}
              fontSize={'1em'}
              fontWeight={'bold'}
              my='auto'
            >
              Doctory
            </ChackraLink>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10} alignItems='center'>
            <Stack direction={'row'} alignItems='center' spacing={4}>
              {navbarItems.map((navItem) => (
                <ChackraLink key={navItem.label} as={Link} to={navItem.path ?? '/'} fontSize={'sm'} fontWeight={600} sx={{display:'block'}}>
                    {navItem.label}
                </ChackraLink>
              ))}
              <ColorModeSwitcher display={{ base: 'none', md: 'flex' }}/>
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {!authContext.isLoading &&
            authContext.isLoggedIn ? (
              <Button as={Link} to={routes.default.path} onClick={logout} size={'md'} fontSize={'sm'} variant={'ghost'}>
                Cerrar Sesión
              </Button>
            ):(
              <Button as={Link} to={routes.login.path} size={'md'} fontSize={'sm'} variant={'ghost'}>
                Iniciar sesión
              </Button>
            )
          }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          borderBottom='0.5px solid gray'
          py={4}
          display={{ md: 'none' }}>
          {navbarItems.map((navItem) => (
            <Link key={navItem.label} to={navItem.path ?? '/'} onClick={onToggle}>
              <Box
                mx={3}
                p={1}
                _hover={{bg: mobileContainerHover}}
              >
              {navItem.label}
              </Box>
            </Link>
          ))}
          <Box
            mx={3}
            p={1}
            d='flex'
            justifyContent='end'
            onClick={onToggle}>
              <ColorModeSwitcher display={{base: 'flex', md: 'none'}}/>
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
}
