import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Divider, StyleService, useStyleSheet } from '@ui-kitten/components';
import { Pressable } from 'react-native';
import {
  LoginPramList,
  RootStackParamList,
  RootTabParamList,
} from '../../utils/types/types';
import Icon from '../icon';
import { Text, View } from '../Themed';

type TopBarComponentType = {
  title?: string;
  navigation?: CompositeNavigationProp<
    BottomTabNavigationProp<
      RootTabParamList & LoginPramList,
      'Search',
      undefined
    >,
    NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
  >;
  search?: () => void;
  refresh?: () => void;
};

const TopBarComponent = ({ title, refresh, search }: TopBarComponentType) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <>
      <View style={styles.topBarContainer} darkColor="#131313">
        <Text style={styles.topBarTitle}>{title}</Text>
        <View style={styles.iconContainer}>
          <Pressable onPress={search}>
            <Icon size={24} name="search" color="" />
          </Pressable>
          <Pressable
            onPress={refresh}
            style={{
              marginLeft: 32,
            }}
          >
            <Icon name="refresh" color="" size={24} />
          </Pressable>
        </View>
      </View>
      <Divider />
    </>
  );
};

const themedStyle = StyleService.create({
  topBarContainer: {
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
});

export default TopBarComponent;
