import { Card, Avatar } from '@ui-kitten/components';
import { StyleSheet, ListRenderItemInfo } from 'react-native';
import { Text, View } from '../../components/Themed';
import IGenericItem from '../../utils/interfaces/IGenericItem';
import { RootTabScreenProps } from '../../utils/types/types';

const ItemList = (
  data: ListRenderItemInfo<IGenericItem> & RootTabScreenProps<'List'>
) => {
  const { item, navigation } = data;
  const renderItemHeader = (info: IGenericItem) => (
    <View darkColor="#ffff" style={styles.title}>
      <Avatar size="giant" source={{ uri: info.itemCover }} />
      <View darkColor="#ffff">
        <Text style={{ marginLeft: 8, fontSize: 16, color: 'black' }}>
          {info.name}
        </Text>
        <Text style={{ marginLeft: 8, fontSize: 12, color: 'black' }}>
          {info.category}
        </Text>
      </View>
    </View>
  );

  const renderItemFooter = (genres: string[]) => (
    <View darkColor="#ffff" style={styles.chipContainer}>
      {genres.map((genre, index) => (
        <View key={index} style={styles.chip}>
          <Text>{genre}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Card
      style={styles.item}
      status="info"
      header={() => renderItemHeader(item)}
      footer={() => renderItemFooter(item.genres)}
      onPress={() => navigation.navigate('Modal', { itemId: item.id })}
    >
      <Text style={{ color: 'black' }}>{item.description}</Text>
    </Card>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  item: {
    marginVertical: 6,
    backgroundColor: '#ffff',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 6,
  },
  chip: {
    backgroundColor: '#6fbce8',
    borderRadius: 10,
    padding: 6,
    margin: 4,
    justifyContent: 'space-between',
  },
});
