import React from 'react';
import { Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../utils/hooks/useColorScheme';
import TabTwoScreen from '../../screens/tabTwoScreen';
import BottomTab from '../../utils/navigation/BottomTab';
import Icon from '../icon/';
import TabOneScreen from '../../screens/tabOneScreen';
import { RootTabScreenProps } from '../../utils/types/types';

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Icon
                name="info-circle"
                color={Colors[colorScheme].text}
                style={{
                  marginRight: 15,
                }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'TabTwo',
          tabBarIcon: ({ color }) => <Icon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

{
  /* <Pressable
  onPress={() => navigation.navigate("Modal")}
  style={({ pressed }) => ({
    opacity: pressed ? 0.5 : 1,
  })}
>
  <FontAwesome
    name='info-circle'
    size={25}
    color={Colors[colorScheme].text}
    style={{ marginRight: 15 }}
  />
</Pressable>; */
}

export default BottomTabNavigator;
