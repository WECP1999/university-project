import { StyleSheet, Pressable } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Accesses', { screen: 'Signin' })}
      >
        <Text style={styles.title}>Tab One</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
