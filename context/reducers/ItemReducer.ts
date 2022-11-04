import IReducerAction from '../../utils/interfaces/IReducerAction';
import { ItemsActions } from '../actions/ItemActions';
import items, { ItemsState } from '../initialValues/itemInitialValue';

const ItemReducer = (
  state = items,
  action: IReducerAction<typeof ItemsActions, ItemsState>
) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return {
        ...items,
      };
  }
};
export default ItemReducer;