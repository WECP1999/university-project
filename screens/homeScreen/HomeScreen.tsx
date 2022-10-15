import { StyleSheet, ScrollView } from 'react-native';
import ItemPreview from '../../components/itemPreview';
import { View } from '../../components/Themed';
import mangaList from '../../utils/mocks/mangaList.mock';
import { RootTabScreenProps } from '../../utils/types/types';

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {mangaList.map((manga, index) => (
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
