import React from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-config';
import initialFirebaseValue, {
  InitialFirebaseValue,
} from '../initialValues/firebaseApp';
import FirebaseReducer from '../reducers/FirebaseReducers';
import IReducerAction from '../../utils/interfaces/IReducerAction';

type FirebaseContextType = {
  state: InitialFirebaseValue;
  dispatch: React.Dispatch<
    IReducerAction<
      Readonly<{
        GET_APP: 'GET_APP';
        SET_APP: 'SET_APP';
        DELETE_APP: 'DELETE_APP';
      }>,
      InitialFirebaseValue
    >
  >;
};

type FirebaseContextProviderProps = {
  children: React.ReactNode;
};

const FirebaseContext = React.createContext<FirebaseContextType>({
  state: initialFirebaseValue,
  dispatch: () => null,
});
export default FirebaseContext;

export const FirebaseContextProvider = ({
  children,
}: FirebaseContextProviderProps) => {
  const [state, dispatch] = React.useReducer(
    FirebaseReducer,
    initialFirebaseValue
  );

  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);
    if (app) {
      const store = getFirestore(app);
      dispatch({ type: 'SET_APP', payload: { app } });
      dispatch({ type: 'SET_STORE', payload: { store } });
    }
  }, []);

  return (
    <FirebaseContext.Provider value={{ state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  );
};
