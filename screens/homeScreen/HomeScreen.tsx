import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ItemPreview from '../../components/itemPreview';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';
import FirebaseContext from '../../context/provider/FirebaseProvider';
import ItemContext from '../../context/provider/ItemProvider';
import { setItemsAction } from '../../context/actions/ItemActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spinner } from '@ui-kitten/components';

const HomeScreen = (navigation: RootTabScreenProps<'Home'>) => {
  const {
    state: { store },
  } = React.useContext(FirebaseContext);
  const {
    state: { items, loading },
    dispatch,
  } = React.useContext(ItemContext);

  const getAllItems = React.useCallback(async () => {
    console.log(!items || items?.length === 0);

    if (store) {
      setItemsAction(store, dispatch);
    }
  }, [store]);

  React.useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  if ((!items || items?.length === 0) &&  loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Spinner size="giant" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {items &&
          items.slice(0, 6).map((manga, index) => (
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

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default HomeScreen;
