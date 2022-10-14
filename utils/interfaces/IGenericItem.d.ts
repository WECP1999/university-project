import IGenre from './IGenre';
import IState from './IState';

interface IGenericItem {
  id: number;
  itemCover: string;
  name: string;
  description: string;
  genres: IGenre[];
  state: IState;
  category: 'manga' | 'anime';
}

export default IGenericItem;
