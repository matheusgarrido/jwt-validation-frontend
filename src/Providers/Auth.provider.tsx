import React, { useState, useContext, useEffect } from 'react';
import Storage from '../helpers/localStorage';

//Interfaces and types
interface ITokens {
  access: string;
  refresh: string;
}

type ISetTokens = React.Dispatch<React.SetStateAction<ITokens>>;

interface IAuthContext {
  tokens: ITokens;
  setTokens: ISetTokens;
}

//Context
export const AuthContext = React.createContext({} as IAuthContext);

//Provider
export const AuthProvider = ({ children }: { children: React.ReactChild }) => {
  const [tokens, setTokens] = useState({} as ITokens);
  //Get value from local storage
  useEffect(() => {
    const savedAccessToken = Storage.getItem('access');
    const access = savedAccessToken ? savedAccessToken : '';
    const savedRefreshToken = Storage.getItem('refresh');
    const refresh = savedRefreshToken ? savedRefreshToken : '';
    setTokens({ access, refresh });
  }, []);
  //When the token value changes, update in the local storage
  useEffect(() => {
    if (tokens.access && tokens.refresh) {
      Storage.setItem('access', tokens.access);
      Storage.setItem('refresh', tokens.refresh);
    }
  }, [tokens]);
  //Provider component
  return (
    <AuthContext.Provider value={{ tokens, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom auth context hook
export const useAuthContext = () => useContext(AuthContext);
