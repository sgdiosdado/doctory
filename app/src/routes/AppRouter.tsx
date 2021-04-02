import { Box } from '@chakra-ui/layout';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Navbar } from '../views/Navbar/Navbar';
import { routes } from './routes';
import { useColorModeValue } from '@chakra-ui/color-mode';

export const AppRouter = () => {
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [useType, setUserType] = useState('PAC');

  return (
    <Box d={'flex'} alignItems={'center'} flexDirection={'column'} h={'100vh'}>
      <Router>
        <Box w='100%'>
        <Navbar />
        </Box>
        <Box h='100%' width='100%' d='flex' flexGrow={1} flexDirection={'column'} bg={useColorModeValue('gray.100', 'gray.800')}>
          <Switch>
            <Route exact path={routes.default.path} component={routes.default.component} />
            <Route exact path={routes.login.path} component={routes.login.component} />
            <Route exact path={routes.signin.path} component={routes.signin.component} />
            {/* <Route exact path={paths.contact.path} component={} /> TODO: create contact component */}
            <Route path={routes.notFound.path} component={routes.notFound.component} />
            <Redirect to={routes.notFound.path} />
          </Switch>
        </Box>
      </Router>
  </Box>
  )
}
