import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { VStack, Image, Button, } from '@chakra-ui/react'
import NotFoundImage from '../../assets/NotFoundImage.svg';
import { UserContext } from '../../provider/AuthProvider';
import { routes } from '../../routes/routes';


export const NotfoundPage = () => {
  const { authContext } = useContext(UserContext)
  return (
    <VStack flexGrow={1} justifyContent='center'>
      <Image 
        maxH={{base:'15rem', md:'20rem'}}
        src={NotFoundImage}
        mb='4em'
      />
      <Link 
        to={ authContext.isLoggedIn?  routes.home.path : routes.default.path} 
      >
        <Button size='lg' colorScheme='primary' >
          Ir a inicio
        </Button>
      </Link>
    </VStack>
  )
}
