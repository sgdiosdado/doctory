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
        <Box h='100%' width='100%' d='flex' flexGrow={1} flexDirection={'column'} bg={useColorModeValue('gray.50', 'gray.900')}>
          { authContext.isLoading
            ? <LoadingView />
            : (
              <Switch>
                {Object.keys(publicRoutes).map(k => (
                  <Route key={k} exact={k !== '404'} path={publicRoutes[k].path} component={publicRoutes[k].component}/>  
                ))}

                {Object.keys(protectedRoutes).map(k => (
                  <Route key={k} exact
                    path={protectedRoutes[k].path}
                    render= { () => {
                      const Component = protectedRoutes[k].component;
                      return authContext.isLoggedIn
                      ? <Component /> 
                      : <Redirect to={publicRoutes.login.path}/>
                    }}
                  />
                ))
                }
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
