import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';

export type InitialFirebaseValue = {
  app?: FirebaseApp;
  store?: Firestore;
};

const initialFirebaseValue: InitialFirebaseValue = {
  app: {
    name: '',
    options: {},
    automaticDataCollectionEnabled: false,
  },
  store: undefined,
};

export default initialFirebaseValue;
