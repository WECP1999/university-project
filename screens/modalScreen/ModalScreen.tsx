import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../../components/Themed';
import { RootStackParamList } from '../../utils/types/types';
import {
  Divider,
  StyleService,
  useStyleSheet,
  Spinner,
} from '@ui-kitten/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ItemContext from '../../context/provider/ItemProvider';
import FirebaseContext from '../../context/provider/FirebaseProvider';
import {
  deleteFavorite,
  editRating,
  getGlobalRating,
  getIsFavorite,
  getRating,
  getSingleItem,
  setFavorite,
  setRating,
} from '../../context/actions/ItemActions';
import IGenericItem from '../../utils/interfaces/IGenericItem';
import Icon from '../../components/icon';
import { Rating } from 'react-native-ratings';
import { Alert } from 'react-native';
import IRating from '../../utils/interfaces/IRating';

type ModalScreenType = NativeStackScreenProps<RootStackParamList, 'Modal'>;

const ModalScreen = ({ route, navigation }: ModalScreenType) => {
  const [selectedItem, setSelectedItem] = React.useState<
    IGenericItem | undefined
  >();
  const [ratingId, setRatingId] = React.useState('');
  const [defaultRating, setDefaultRating] = React.useState(3.5);
  const [favoriteId, setFavoriteId] = React.useState('');
  const styles = useStyleSheet(modalScreenStyle);

  const {
    state: { store },
  } = React.useContext(FirebaseContext);
  const {
    state: { loading },
    dispatch,
  } = React.useContext(ItemContext);

  const setNewRanking = React.useCallback(
    async (rate: number) => {
      const id = route.params?.itemId;
      if (id && store) {
        setDefaultRating(rate);
        if (ratingId !== '0') {
          await editRating(store, dispatch, ratingId, rate);
          return;
        }
        const response = await setRating(
          store,
          dispatch,
          id.toString(),
          rate,
          '2'
        );
        if (!response) {
          Alert.alert(
            `An error have ocurred while attempting to set self ranking for selected item.`
          );
          return;
        }
        setRatingId(response.id);
        return;
      }
    },
    [route, ratingId]
  );

  const handleFavorite = React.useCallback(async () => {
    const id = route.params?.itemId;
    if (id && store) {
      if (favoriteId) {
        setFavoriteId('');
        await deleteFavorite(store, dispatch, favoriteId);
        return;
      }
      const newFavorite = await setFavorite(
        store,
        dispatch,
        id.toString(),
        '2'
      );
      if (!newFavorite) {
        Alert.alert(
          'An error have ocurred, please try to mark as favorite latter.'
        );
      }
      setFavoriteId(newFavorite.id);
      return;
    }
  }, [favoriteId, route, store]);

  React.useEffect(() => {
    const getSelectedItem = async () => {
      const id = route.params?.itemId;
      if (id && store) {
        const item = (await getSingleItem(
          store,
          dispatch,
          id.toString()
        )) as unknown as IGenericItem;
        const rating = await getRating(store, dispatch, id.toString(), '2');
        const typedRating = rating as unknown as IRating;
        if (rating) {
          setDefaultRating(typedRating.rating);
        } else {
          const globalRating = await getGlobalRating(
            store,
            dispatch,
            id.toString()
          );
          setDefaultRating(globalRating);
        }
        setRatingId(rating ? typedRating.id : '0');
        if (item) {
          setSelectedItem(item);
        }
      }
    };
    getSelectedItem();
  }, [route]);

  React.useEffect(() => {
    const getFavorite = async () => {
      const id = route.params?.itemId;
      if (id && store) {
        const item = await getIsFavorite(store, dispatch, id.toString(), '2');
        if (item) {
          setFavoriteId(item.id);
        }
      }
    };
    getFavorite();
  }, [route, store]);

  return (
    <ScrollView style={{ paddingTop: 29, backgroundColor: '#fff' }}>
      <ImageBackground
        style={styles.imagePreviewContainer}
        resizeMode="cover"
        source={{
          uri: selectedItem?.itemCover,
        }}
      >
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Icon color="white" name="arrow-left" size={24} />
        </Pressable>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          <Text style={styles.overlayText} lightColor="#fff" darkColor="#000">
            {selectedItem?.name}
          </Text>
        </LinearGradient>
        <Pressable style={styles.favorite} onPress={handleFavorite}>
          <Icon
            color="white"
            name={!favoriteId ? 'heart-o' : 'heart'}
            size={40}
          />
        </Pressable>
      </ImageBackground>
      <View style={styles.body}>
        <View>
          <Text style={styles.bodyTitle}>Title</Text>
          <Text style={styles.bodyText}>{selectedItem?.name}</Text>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.bodyTitle}>Description</Text>
          <Text style={styles.bodyText}>{selectedItem?.description}</Text>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={styles.bodyTitle}>Details</Text>
          <Text style={[styles.bodyText, styles.bodySubtitle]}>Genre</Text>
          <Text style={styles.bodyText}>{selectedItem?.genres[0]}</Text>
          <Text style={[styles.bodyText, styles.bodySubtitle]}>State</Text>
          <Text style={styles.bodyText}>{selectedItem?.state}</Text>
          <Text style={[styles.bodyText, styles.bodySubtitle]}>ID</Text>
          <Text style={styles.bodyText}>{selectedItem?.id}</Text>
          <Text style={[styles.bodyText, styles.bodySubtitle]}>Ranking</Text>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            {ratingId.trim().length > 0 && (
              <Rating
                startingValue={defaultRating}
                type="custom"
                fractions={1}
                ratingCount={5}
                jumpValue={0.5}
                onFinishRating={(rating: number) => setNewRanking(rating)}
              />
            )}
            <Text style={{ marginTop: 8 }}>{`${defaultRating} ${
              ratingId === '0' ? 'Global rating' : 'Self rating'
            }`}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={{ marginBottom: 40 }}>
          <Text style={[styles.bodyTitle, styles.bodySubtitle]}>Genres</Text>
          <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 8 }}>
            {selectedItem?.genres.map((genre, index) => (
              <Text
                key={genre}
                style={{
                  backgroundColor: '#417BA4',
                  color: '#fff',
                  padding: 8,
                  borderRadius: 16,
                  marginLeft: index === 0 ? 0 : 8,
                }}
              >
                {genre}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      {loading && (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            opacity: 0.8,
            backgroundColor: '#fff',
            zIndex: 999999999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Spinner size="giant" />
        </SafeAreaView>
      )}
      <StatusBar />
    </ScrollView>
  );
};

export default ModalScreen;

const modalScreenStyle = StyleService.create({
  imagePreviewContainer: {
    width: '100%',
    height: 220,
    marginTop: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
  },
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  overlayText: {
    fontSize: 32,
    marginLeft: 16,
    fontWeight: '900',
  },
  goBack: {
    position: 'absolute',
    top: 8,
    left: 16,
    zIndex: 9999,
  },
  divider: { marginHorizontal: -16, marginVertical: 24 },
  favorite: {
    borderRadius: 40,
    position: 'absolute',
    bottom: -28,
    right: 16,
    zIndex: 9999,
    backgroundColor: 'color-danger-400',
    padding: 16,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    position: 'relative',
  },
  bodyTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  bodyText: {
    color: 'color-gray-500',
    marginTop: 8,
  },
  bodySubtitle: {
    color: '#000',
    fontSize: 16,
  },
});
