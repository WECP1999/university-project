import IReducerAction from '../../utils/interfaces/IReducerAction';
import FirebaseActions from '../actions/FirebaseActions';
import initialFirebaseValue, {
  InitialFirebaseValue,
} from '../initialValues/firebaseApp';

const FirebaseReducer = (
  state = initialFirebaseValue,
  action: IReducerAction<typeof FirebaseActions, InitialFirebaseValue>
) => {
  switch (action.type) {
    case 'SET_APP':
      return {
        ...state,
        app: action.payload.app,
      };
    case 'SET_STORE':
      return {
        ...state,
        store: action.payload.store,
      };
    case 'GET_APP':
      return {
        ...state,
      };
    case 'DELETE_APP':
      return {
        ...initialFirebaseValue,
      };
    default:
      return {
        ...initialFirebaseValue,
      };
  }
};

export default FirebaseReducer;
