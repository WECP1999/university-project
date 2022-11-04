import { collection, Firestore, getDocs } from 'firebase/firestore';
import IGenericItem from '../../utils/interfaces/IGenericItem';
import IReducerAction from '../../utils/interfaces/IReducerAction';
import { ItemsState } from '../initialValues/itemInitialValue';

export const ItemsActions = Object.freeze({
  SET_ITEMS: 'SET_ITEMS',
  SET_LOADING: 'SET_LOADING',
});

type ItemsDispatch = React.Dispatch<
  IReducerAction<Readonly<typeof ItemsActions>, ItemsState>
>;

export const setItemsAction = async (store: Firestore, dispatch: ItemsDispatch) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const fireStore = collection(store, 'items');
    const allItems = await getDocs(fireStore);
    const parsedDocs = allItems.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as unknown as IGenericItem[];
    dispatch({ type: 'SET_ITEMS', payload: { items: parsedDocs } });
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return parsedDocs;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
