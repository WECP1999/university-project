import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';
import ItemList from '../../components/itemList/ItemList';
import { List } from '@ui-kitten/components';
import ItemContext from '../../context/provider/ItemProvider';

const ListScreen = ({ navigation, route }: RootTabScreenProps<'List'>) => {
  const {
    state: { items, loading },
  } = React.useContext(ItemContext);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(props) => (
        <ItemList {...props} navigation={navigation} route={route} />
      )}
    />
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffff',
  },
});
