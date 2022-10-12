import React from 'react';
import ModalScreen from '../../screens/modalScreen';
import NotFoundScreen from '../../screens/notFoundScreen';
import Stack from '../../utils/navigation/Stack';
import AccessNavigator from '../accessNavigator/';
import BottomTabNavigator from '../bottomTabNavigator';

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
          options={{ title: 'Detalle' }}
          component={ModalScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
