import { Box } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Navbar } from '../views/Navbar/Navbar';
import { protectedRoutes, publicRoutes } from './routes';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Footer } from '../views/Footer/Footer';
import { UserContext } from '../provider/AuthProvider';
import { LoadingView } from '../views/AuthViews/LoadingView';

export const AppRouter = () => {
  const { authContext } = useContext(UserContext)

  return (
      <Box d={'flex'} alignItems={'center'} flexDirection={'column'} minH={'100vh'}>
        <Router>
          <Box w='100%'>
            <Navbar />
          </Box>
          <Box h='100%' width='100%' d='flex' flexGrow={1} flexDirection={'column'} bg={useColorModeValue('gray.100', 'gray.800')}>
              { authContext.isLoading
                ? <LoadingView />
                : (
                  <Switch>
                  {authContext.isLoggedIn &&
                  Object.keys(protectedRoutes).map(k => (
                    authContext.isLoggedIn
                    ? <Route key={k} exact path={protectedRoutes[k].path} component={protectedRoutes[k].component} />
                    : <Redirect key={k} to={publicRoutes.login.path} />
                  ))}

                  {Object.keys(publicRoutes).map(k => (
                    <Route key={k} exact={k !== '404'} path={publicRoutes[k].path} component={publicRoutes[k].component}/>
                  ))}
                  <Redirect to={publicRoutes.notFound.path} />
                  </Switch>
                )
              }
            <Footer />
          </Box>
        </Router>
      </Box>
  )
}
