import { Box } from '@chakra-ui/layout';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Navbar } from '../views/Navbar/Navbar';
import { routes } from './routes';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Footer } from '../views/Footer/Footer';


export const AppRouter = () => {



  return (
      <Box d={'flex'} alignItems={'center'} flexDirection={'column'} minH={'100vh'}>
        <Router>
          <Box w='100%'>
            <Navbar />
          </Box>
          <Box h='100%' width='100%' d='flex' flexGrow={1} flexDirection={'column'} bg={useColorModeValue('gray.100', 'gray.800')}>
            <Switch>
              {
                Object.keys(routes).map(k => (
                  <Route key={k} exact={k !== '404'} path={routes[k].path} component={routes[k].component}/>
                ))
              }
              <Redirect to={routes.notFound.path} />
            </Switch>
            <Footer />
          </Box>
        </Router>
      </Box>
  )
}
