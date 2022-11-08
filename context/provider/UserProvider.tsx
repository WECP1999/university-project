import React, { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    const verificarUsuario = async () => {
      const localUser = await AsyncStorage.getItem('USER');
    };
    verificarUsuario();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (UserCredential) {
        console.info('cuenta creada');
        setUser(UserCredential.user);
        return UserCredential.user;
      }
      return UserCredential;
    } catch (error) {
      return error;
    }
  };

  const logIn = async (email: string, password: string) => {
    const error = await signInWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        setUser(UserCredential.user);
        return UserCredential.user;
      })
      .catch((error) => {
        return error;
      });
    return error;
  };

  const persistentUser = async (userJSON: object) => {
    try {
      await AsyncStorage.setItem('USER', JSON.stringify(userJSON));
    } catch (e) {
      Alert.alert('Error', 'El usuario no se pudo almacenar');
    }
  };

  const checkPersistentUser = async () => {
    try {
      const localUser = await AsyncStorage.getItem('USER');
      if (localUser === null || !localUser) {
        return false;
      }
      const localUserObj = JSON.parse(localUser!);
      if (Date.now() > localUserObj.expirationTime) {
        return false;
      }
      setUser(JSON.parse(localUser));
      return true;
    } catch (error) {
      throw new Error('ocurrio un error al traer el usuario');
    }
  };

  const firebaseObjUser = {
    user,
    signIn,
    logIn,
    persistentUser,
    checkPersistentUser,
  };

  return (
    <UserContext.Provider value={firebaseObjUser}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider };
export default UserContext;
