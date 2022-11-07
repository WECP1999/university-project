import { Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../utils/types/types';

const FavoriteScreen = ({ navigation }: RootTabScreenProps<'Favorite'>) => {
  const styles = useStyleSheet(favScreenStyle);
  const goToLogIn = () => {
    navigation.navigate('Accesses', { screen: 'Login' });
  };

  const goToSignIn = () => {
    navigation.navigate('Accesses', { screen: 'Signin' });
  };
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
});
