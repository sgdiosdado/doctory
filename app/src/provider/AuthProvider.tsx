import React, { useState, FC, useEffect } from 'react';
import { createContext } from "react";
import { http } from '../http/client';
import { getToken } from '../utils/token';


type authContextStateType = {
  type?: string[],
  isLoggedIn: boolean,
  isLoading: boolean,
}

type authContextType = {
  authContext: authContextStateType,
  login: (type: string[]) => void,
  logout: () => void,
}

const defaultContextValues: authContextType = {
  authContext: { type: [''], isLoggedIn: false, isLoading: true },
  login: () => {},
  logout: () => {},
}
// Context
export const UserContext = createContext<authContextType>(defaultContextValues);

// Provider
export const AuthProvider : FC = ({ children }) => {
  
  const [authContext, setAuthContext] = useState<authContextStateType>(defaultContextValues.authContext);

  const login = (type : string[]) => {
    setAuthContext(_ => ({
      type,
      isLoggedIn: true,
      isLoading: false,
    }));
  };

  const logout = () => {
    setAuthContext(_ => ({
      type: [''],
      isLoggedIn: false,
      isLoading: false,
    }));
  };

  useEffect(() => {
    if(getToken()) { // If there's already a Token in storage we validate it
      http.getUserType().then(type => {
        if(!type) {
          localStorage.clear();
          setAuthContext({type:undefined, isLoggedIn: false, isLoading: false})
        }else{
          setAuthContext({type:type, isLoggedIn: true, isLoading: false})
        }
      })
    }else{
      setAuthContext({type:undefined, isLoggedIn: false,  isLoading: false})
    }

  }, []);

  return (
    <UserContext.Provider value={{ authContext, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
