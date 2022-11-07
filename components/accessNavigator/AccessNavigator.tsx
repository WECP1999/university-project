import LogInScreen from '../../screens/logInScreen';
import SignIn from '../../screens/signIn';
import AccessStack from '../../utils/navigation/AccessStack';

const AccessNavigator = () => {
  return (
    <AccessStack.Navigator initialRouteName="Login">
      <AccessStack.Screen options={{headerShown:false}} name="Login" component={LogInScreen} />
      <AccessStack.Screen options={{headerShown:false}} name="Signin" component={SignIn} />
    </AccessStack.Navigator>
  );
};

export default AccessNavigator;
