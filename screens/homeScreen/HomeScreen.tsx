import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ItemPreview from '../../components/itemPreview';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';
import FirebaseContext from '../../context/provider/FirebaseProvider';
import ItemContext from '../../context/provider/ItemProvider';
import { setItemsAction } from '../../context/actions/ItemActions';

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  const {
    state: { store },
  } = React.useContext(FirebaseContext);
  const {
    state: { items, loading },
    dispatch,
  } = React.useContext(ItemContext);

  const getAllItems = React.useCallback(async () => {
    if (store) {
      setItemsAction(store, dispatch);
    }
  }, [store]);

  React.useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {items &&
          items.map((manga, index) => (
            <ItemPreview
              key={manga.id}
              item={manga}
              navigation={navigation}
              style={{
                marginLeft: (index + 1) % 2 === 0 ? 36 : 0,
              }}
            />
          ))}
      </View>
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
