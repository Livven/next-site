import React from 'react';
import { useLocalStorage } from './localStorage';

const reducer = (records, action) => {
  switch (action.type) {
    case 'init':
      return { ...action.serverState };
    default:
      throw new Error('Unkown action');
  }
};

const User = React.createContext();

export const UserProvider = ({ user, children }) => {
  const [userData] = useLocalStorage('user', reducer, user || undefined);

  return <User.Provider value={userData}>{children}</User.Provider>;
};

export const useGetUser = () => {
  const user = React.useContext(User);

  if (user && Object.keys(user).length) {
    return user;
  }
};

export const useHasUser = () => {
  return Boolean(useGetUser());
};
