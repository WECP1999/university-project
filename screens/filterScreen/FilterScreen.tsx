import React from 'react'
import { Text, View } from '../../components/Themed';
import { StyleSheet, Pressable } from 'react-native';
import Icon from '../../components/icon/Icon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types/types';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput';

type SearchScreenType = NativeStackScreenProps<RootStackParamList, 'Search'>;

const FilterScreen = ({ route, navigation }: SearchScreenType) => {
    const methods = useForm();
  return (
    <View>
      <View style={styles.headerNav}>
        <Pressable onPress={() => navigation.goBack()}>
            <Icon size={24} name="arrow-left" color="" />
        </Pressable>
        <FormProvider  {...methods}>
            <CustomInput
                textStyle={{color: 'black'}}
                size="large"
                style={styles.input}
                label=""
                name="search"
                placeholder="Search"
                accessoryRight={() => {
                    return <Icon size={24} name="search" color="black" />;
            }}/>
        </FormProvider>
      </View>
    </View>
  )
}

export default FilterScreen

const styles = StyleSheet.create({
    headerNav: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#ffff',
        borderColor: 'transparent'
      },
  });
