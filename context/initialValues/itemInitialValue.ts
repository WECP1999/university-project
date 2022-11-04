import IGenericItem from '../../utils/interfaces/IGenericItem';

export type ItemsState = {
  items?: IGenericItem[];
  loading?: boolean;
};

const items: ItemsState = {
  items: [],
  loading: false,
};

export default items;
