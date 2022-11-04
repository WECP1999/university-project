import React from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Text, View } from '../Themed';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  LoginPramList,
  RootStackParamList,
  RootTabParamList,
} from '../../utils/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IGenericItem from '../../utils/interfaces/IGenericItem';

type ItemPreviewProp = {
  item: IGenericItem;
  style?: StyleProp<ViewStyle>;
  navigation?: CompositeNavigationProp<
    BottomTabNavigationProp<
      RootTabParamList & LoginPramList,
      'Home',
      undefined
    >,
    NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
  >;
};

const ItemPreview = ({ style, item, navigation }: ItemPreviewProp) => {
  const styles = useStyleSheet(moviePreviewStyle);

  const onPress = () => {};

  return (
    <Pressable onPress={onPress} style={{ width: 160 }}>
      <ImageBackground
        style={[styles.imagePreviewContainer, style]}
        resizeMode="stretch"
        source={{
          uri: item.itemCover,
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          <Text style={styles.overlayText} lightColor="#fff" darkColor="#000">
            {item.name}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const moviePreviewStyle = StyleService.create({
  imagePreviewContainer: {
    width: 180,
    height: 260,
    marginVertical: 8,
  },
  image: {
    width: '100%',
  },
  overlay: { height: '100%', width: '100%', justifyContent: 'flex-end' },
  overlayText: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
});

export default ItemPreview;
