import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';
import ItemList from '../../components/itemList/ItemList';
import { List } from '@ui-kitten/components';

const tempData = [{
  id: 1,
  itemCover: "nose",
  name: "koe no katachi",
  description: "Pa llorar",
  genres: [],
  state: "finish",
  category: 'manga' 
},
{
  id: 2,
  itemCover: "nose",
  name: "koe no katachi",
  description: "Pa llorar",
  genres: [],
  state: "finish",
  category: 'manga' 
}]

const ListScreen = ({ navigation }: RootTabScreenProps<'List'>) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <List
          style={styles.containerList}
          contentContainerStyle={styles.contentContainer}
          data={tempData}
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
    // alignItems: 'flex-start',
    width: '100%',
  },
  containerList: {
    // maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
