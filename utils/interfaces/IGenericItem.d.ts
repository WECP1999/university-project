import IGenre from './IGenre';
import IState from './IState';

interface IGenericItem {
  id: number;
  itemCover: string;
  name: string;
  description: string;
  genres: string[];
  state: string;
  category: 'manga' | 'anime';
}

export default IGenericItem;
