import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';
import ItemList from '../../components/itemList/ItemList';
import { List } from '@ui-kitten/components';
import ItemContext from '../../context/provider/ItemProvider';

const ListScreen = ({ navigation }: RootTabScreenProps<'List'>) => {
  const {
    state: { items, loading },
  } = React.useContext(ItemContext);
  
  if (loading) {
    return <Text>Loading</Text>;
  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <List
          contentContainerStyle={styles.contentContainer}
          data={items}
          renderItem={ItemList}
        />
      </View>
    </ScrollView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffff'
  },
});
