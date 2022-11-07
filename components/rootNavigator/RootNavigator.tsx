import React from 'react';
import ModalScreen from '../../screens/modalScreen';
import FilterScreen from '../../screens/filterScreen';
import NotFoundScreen from '../../screens/notFoundScreen';
import Stack from '../../utils/navigation/Stack';
import AccessNavigator from '../accessNavigator/';
import BottomTabNavigator from '../bottomTabNavigator';
import LogInScreen from '../../screens/logInScreen/LogInScreen';

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Accesses"
        component={AccessNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Modal"
          options={{ headerShown: false }}
          component={ModalScreen}
        />
        <Stack.Screen
          name="Search"
          options={{ title: 'Search', headerShown:false }}
          component={FilterScreen}
        />
        <Stack.Screen
          name="LogIn"
          options={{headerShown:false,}}
          component={LogInScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
