import { Box } from '@chakra-ui/layout';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Navbar } from '../views/Navbar/Navbar';
import { routes } from './routes';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Footer } from '../views/Footer/Footer';

export const AppRouter = () => {
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [useType, setUserType] = useState('PAC');

  return (
    <Box d={'flex'} alignItems={'center'} flexDirection={'column'} minH={'100vh'}>
      <Router>
        <Box w='100%'>
          <Navbar />
        </Box>
        <Box h='100%' width='100%' d='flex' flexGrow={1} flexDirection={'column'} bg={useColorModeValue('gray.100', 'gray.800')}>
          <Switch>
            <Route exact path={routes.default.path} component={routes.default.component} />
            <Route exact path={routes.login.path} component={routes.login.component} />
            <Route exact path={routes.signin.path} component={routes.signin.component} />
            <Route exact path={routes.patientHome.path} component={routes.patientHome.component} />
            <Route exact path={routes.doctorLanding.path} component={routes.doctorLanding.component} />
            <Route exact path={routes.doctorPatientsTable.path} component={routes.doctorPatientsTable.component} />
            <Route exact path={routes.doctorPatients.path} component={routes.doctorPatients.component} />
            {/* <Route exact path={paths.contact.path} component={} /> TODO: create contact component */}
            <Route path={routes.notFound.path} component={routes.notFound.component} />
            <Redirect to={routes.notFound.path} />
          </Switch>
          <Footer />
        </Box>
      </Router>
  </Box>
  )
}
