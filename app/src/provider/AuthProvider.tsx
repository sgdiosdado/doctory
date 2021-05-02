import React, { useState, FC, useEffect } from 'react';
import { createContext } from "react";
import { getToken } from '../utils/token';


type authContextStateType = {
  type: string[],
  isLoggedIn: boolean,
}

type authContextType = {
  authContext: authContextStateType,
  login: (type: string[]) => void,
  setType: (type: string[]) => void,
  logout: () => void,
}

const defaultContextValues: authContextType = {
  authContext: { type: [''], isLoggedIn: false },
  login: () => {},
  logout: () => {},
  setType: () => {},
}
// Context
export const UserContext = createContext<authContextType>(defaultContextValues);

// Provider
export const AuthProvider : FC = ({ children }) => {
  const [authContext, setAuthContext] = useState<authContextStateType>({ type: [''], isLoggedIn: true });

  const login = (type : string[]) => {
    setAuthContext(_ => ({
      type: type,
      isLoggedIn: true,
    }));
  };

  const setType = (type: string[]) => {
    setAuthContext(x =>({...x, type:type}))
  }

  const logout = () => {
    setAuthContext(_ => ({
      type: [''],
      isLoggedIn: false,
    }));
  };

  useEffect(() => {
    const storedData = getToken();
    if (storedData) {
       login(['PAT']); //TODO
    }
  }, []);

  return (
    <UserContext.Provider value={{ authContext, login, logout, setType }}>
      {children}
    </UserContext.Provider>
  );
}
