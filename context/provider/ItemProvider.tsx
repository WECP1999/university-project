import React from 'react';
import IReducerAction from '../../utils/interfaces/IReducerAction';
import { ItemsActions } from '../actions/ItemActions';
import items, { ItemsState } from '../initialValues/itemInitialValue';
import ItemReducer from '../reducers/ItemReducer';

type ItemContextType = {
  state: ItemsState;
  dispatch: React.Dispatch<
    IReducerAction<Readonly<typeof ItemsActions>, ItemsState>
  >;
};

type ItemContextProviderProps = {
  children: React.ReactNode;
};

const ItemContext = React.createContext<ItemContextType>({
  state: items,
  dispatch: () => null,
});
export default ItemContext;

export const ItemContextProvider = ({
  children,
}: ItemContextProviderProps) => {
  const [state, dispatch] = React.useReducer(ItemReducer, items);

  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};
