import React, { createContext, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase-config';

const UserContext = createContext({});

type Props = {
  children: JSX.Element;
};

type data = {
  email: string;
  password: string;
};
const UserProvider = ({ children }: Props) => {
  //firebase variables
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  //User state
  const [user, setUser] = useState({});

  const signIn = async (email:string, password:string) => {
    const error = await createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        console.info('cuenta creada');
        setUser(UserCredential.user);
      })
      .catch((error) => {
        return error;
      });
    return error;
  };

  const logIn = async (email:string, password:string) => {
    const error = await signInWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
      console.info('cuenta creada');
      setUser(UserCredential.user);
    })
    .catch((error) => {
      return error;
    });
  return error;
  };

  const firebaseObjUser = { user, signIn, logIn };
  return (
    <UserContext.Provider value={firebaseObjUser}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider };
export default UserContext;
