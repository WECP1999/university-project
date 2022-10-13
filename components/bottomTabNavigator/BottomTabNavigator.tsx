import React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../utils/hooks/useColorScheme';
import ListScreen from '../../screens/listScreen';
import BottomTab from '../../utils/navigation/BottomTab';
import Icon from '../icon/';
import HomeScreen from '../../screens/homeScreen';
import FavoriteScreen from '../../screens/favoriteScreen';
import TopBarComponent from '../topBarComponent';

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
          header: ({ navigation, route }) => <TopBarComponent title="Home" />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={ListScreen}
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <Icon name="list" color={color} />,
          header: ({ navigation, route }) => <TopBarComponent title="List" />,
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Icon name="heart" color={color} />,
          header: ({ navigation, route }) => (
            <TopBarComponent title="Favorite" />
          ),
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
