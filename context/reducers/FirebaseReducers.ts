import { FirebaseApp } from 'firebase/app';
import IReducerAction from '../../utils/interfaces/IReducerAction';
import FirebaseActions from '../actions/FirebaseActions';
import initialFirebaseValue from '../initialValues/firebaseApp';

const FirebaseReducer = (
  state = initialFirebaseValue,
  action: IReducerAction<typeof FirebaseActions, FirebaseApp>
) => {
  switch (action.type) {
    case 'SET_APP':
      return {
        ...action.payload,
      };
    case 'GET_APP':
      return {
        ...state,
      };
    case 'DELETE_APP':
      return {
        ...initialFirebaseValue,
      };
  }
};

export default FirebaseReducer;
