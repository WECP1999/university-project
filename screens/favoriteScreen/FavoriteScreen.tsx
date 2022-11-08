import React from 'react';
import { ScrollView } from 'react-native';
import {
  Button,
  Spinner,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';
import UserContext from '../../context/provider/UserProvider';
import FirebaseContext from '../../context/provider/FirebaseProvider';
import { getAllFavorites } from '../../context/actions/ItemActions';
import ItemContext from '../../context/provider/ItemProvider';
import IGenericItem from '../../utils/interfaces/IGenericItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemPreview from '../../components/itemPreview';

const FavoriteScreen = (navigation: RootTabScreenProps<'Favorite'>) => {
  const { user }: any = React.useContext(UserContext);
  const {
    state: { store },
  } = React.useContext(FirebaseContext);
  const {
    state: { items, loading },
  } = React.useContext(ItemContext);
  const [favorites, setFavorites] = React.useState<IGenericItem[]>([]);
  const styles = useStyleSheet(favScreenStyle);
  const goToLogIn = () => {
    navigation.navigation.navigate('Accesses', { screen: 'Login' });
  };

  const goToSignIn = () => {
    navigation.navigation.navigate('Accesses', { screen: 'Signin' });
  };

  React.useEffect(() => {
    const getUserFavoriteList = async () => {
      if (store && user && user.uid && items && !loading) {
        const response = await getAllFavorites(store, user.uid, items);
        if (response && response.length > 0) {
          setFavorites(response);
        }
      }
    };
    getUserFavoriteList();
  }, [user, loading]);

  if (!user || !user.uid) {
    return (
      <View style={styles.noLoggedIn}>
        <Text style={styles.text}>
          It seems like you have not access here, you have to LogIn.
        </Text>
        <Button style={{ marginBottom: 16 }} onPress={goToLogIn}>
          Go to LogIn
        </Button>
        <Text style={styles.text}>
          You don't have an account? Please checkout our SignIn and create an
          account.
        </Text>
        <Button onPress={goToSignIn}>Go to SignIn</Button>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Ups!</Text>
        <Text style={styles.text}>
          It's seems like you don't have any anime/manga in favorites.
        </Text>
        <Button onPress={() => navigation.navigation.navigate('List')}>
          Go to list of anime/manga.
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {favorites &&
          favorites.map((manga, index) => (
            <ItemPreview
              key={manga.id}
              item={manga}
              navigationDefinition={navigation as any}
              style={{
                marginLeft: (index + 1) % 2 === 0 ? 36 : 0,
              }}
            />
          ))}
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
    </ScrollView>
  );
};

export default FavoriteScreen;

const favScreenStyle = StyleService.create({
  noLoggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    maxWidth: 320,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '600',
    color: 'color-gray-500',
  },
  container: {
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
  },
});
