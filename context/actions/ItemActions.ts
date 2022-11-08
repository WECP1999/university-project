import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
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

export const setItemsAction = async (
  store: Firestore,
  dispatch: ItemsDispatch
) => {
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

export const getSingleItem = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  id: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const docRef = doc(store, 'items', id);
    const itemSnap = await getDoc(docRef);
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return {
      id: itemSnap.id,
      ...itemSnap.data(),
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getRating = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  itemId: string,
  userId: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const fireStore = collection(store, 'itemRating');
    const querySnap = query(
      fireStore,
      where('userId', '==', userId),
      where('itemId', '==', itemId)
    );
    const itemSnap = await getDocs(querySnap);

    const selectedRating = itemSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return selectedRating[0];
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getGlobalRating = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  itemId: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const fireStore = collection(store, 'itemRating');
    const querySnap = query(fireStore, where('itemId', '==', itemId));
    const itemSnap = await getDocs(querySnap);
    let globalRating = 0;
    itemSnap.docs.forEach((rating) => {
      globalRating += rating.data().rating;
    });
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return ((globalRating as number) / 100) * 50;
  } catch (e: any) {
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    throw new Error(e.message);
  }
};

export const setRating = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  itemId: string,
  rating: number,
  userId: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const fireStore = collection(store, 'itemRating');
    const ratingExist = await getRating(store, dispatch, itemId, userId);
    if (ratingExist) {
      await editRating(store, dispatch, ratingExist.id, rating);
      return ratingExist;
    }
    const newRating = await addDoc(fireStore, {
      itemId,
      rating: rating,
      userId,
    });
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return newRating;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const editRating = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  id: string,
  rating: number
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const docRef = doc(store, 'itemRating', id);
    const updatedRating = await updateDoc(docRef, {
      rating: rating,
    });
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return updatedRating;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getIsFavorite = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  itemId: string,
  userId: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const fireStore = collection(store, 'favorites');
    const querySnap = query(
      fireStore,
      where('userId', '==', userId),
      where('itemId', '==', itemId)
    );
    const itemSnap = await getDocs(querySnap);
    const selectedRating = itemSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return selectedRating[0];
  } catch (e: any) {
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    throw new Error(e.message);
  }
};

export const getAllFavorites = async (
  store: Firestore,
  userId: string,
  items: IGenericItem[]
) => {
  try {
    const favoriteFirestore = collection(store, 'favorites');
    const querySnap = query(favoriteFirestore, where('userId', '==', userId));
    const itemSnap = await getDocs(querySnap);
    const favorites = itemSnap.docs.map((doc) => doc.data()?.itemId);
    if (favorites.length > 0) {
      const filteredData = items.filter((item) =>
        favorites.find((fav) => fav === item.id.toString())
      );
      return filteredData;
    }
    return [] as IGenericItem[];
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const setFavorite = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  itemId: string,
  userId: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const fireStore = collection(store, 'favorites');
    const newFavorite = await addDoc(fireStore, {
      itemId,
      userId,
    });
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return newFavorite;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const deleteFavorite = async (
  store: Firestore,
  dispatch: ItemsDispatch,
  id: string
) => {
  try {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const docRef = doc(store, 'favorites', id);
    const deleted = await deleteDoc(docRef);
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return deleted;
  } catch (e: any) {
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    throw new Error(e.message);
  }
};
