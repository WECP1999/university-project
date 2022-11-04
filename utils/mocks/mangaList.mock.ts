import IGenericItem from '../interfaces/IGenericItem';
import genreList from './genreList.mock';

const mangaList: readonly IGenericItem[] = Object.freeze([
  {
    id: 1,
    itemCover:
      'https://cdn.shopify.com/s/files/1/0523/4733/8902/products/20thCenturyBoysPerfectEditionVol.01.jpg?v=1643776254',
    name: '20th Century Boys',
    category: 'manga',
    description: '',
    genres: genreList.slice(0, 3),
    state: {
      id: 1,
      name: '',
      description: '',
    },
  },
  {
    id: 2,
    itemCover:
      'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/ClaymoreCoverTankobon1.jpg/220px-ClaymoreCoverTankobon1.jpg',
    name: 'Claymore',
    category: 'manga',
    description: '',
    genres: genreList.slice(3, 6),
    state: {
      id: 1,
      name: '',
      description: '',
    },
  },
  {
    id: 3,
    itemCover: 'https://cdn2.penguin.com.au/covers/original/9781506733777.jpg',
    name: 'Berserk',
    category: 'manga',
    description: '',
    genres: genreList.slice(6, 9),
    state: {
      id: 1,
      name: '',
      description: '',
    },
  },
  {
    id: 4,
    itemCover:
      'https://cdn.shopify.com/s/files/1/0523/4733/8902/products/71KIJUawzJL.jpg?v=1659734101',
    name: 'Gantz',
    category: 'manga',
    description: '',
    genres: genreList.slice(1, 5),
    state: {
      id: 1,
      name: '',
      description: '',
    },
  },
  {
    id: 5,
    itemCover:
      'https://dwgkfo5b3odmw.cloudfront.net/manga/thumbs/thumb-91392-OnePunchMan_GN23_C1_Web-3-4BcVGZwYSJISVJsALoBDOw.jpg',
    name: 'One Punch Man',
    category: 'manga',
    description: '',
    genres: genreList.slice(5, 12),
    state: {
      id: 1,
      name: '',
      description: '',
    },
  },
]);

export default mangaList;
