import { Box } from '@chakra-ui/layout';
import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoginView from '../components/AuthComponents/LoginView';
import { SigninView } from '../components/AuthComponents/SigninView';
import { Landing } from '../components/Landing/Landing';
import { Navbar } from '../components/Navbar/Navbar';
import { NotfoundPage } from '../components/NotFoundPage/NotfoundPage';
import { paths } from './paths';

export const AppRouter = () => {
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [useType, setUserType] = useState('PAC');

  return (
    <Box d={'flex'} alignItems={'center'} flexDirection={'column'} h={'100vh'}>
      <Router>
        <Box w='100%'>
        <Navbar />
        </Box>
        <Box h='100%' width='100%' d='flex' flexGrow={1} flexDirection={'column'}>
          <Switch>
            <Route exact path={paths.default} component={Landing} />
            <Route exact path={paths.login} component={LoginView} />
            <Route exact path={paths.signin} component={SigninView} />
            {/* <Route exact path={paths.contact} component={ContactView} /> TODO: create contact component */}
            <Route path={paths.notFound} component={NotfoundPage} />
            <Redirect to={paths.notFound} />
          </Switch>
        </Box>
      </Router>
  </Box>
  )
}
