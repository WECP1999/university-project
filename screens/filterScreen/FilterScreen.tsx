import { useState, useContext, useEffect } from "react";
import { Text, View } from '../../components/Themed';
import { StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import Icon from '../../components/icon/Icon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types/types';
import { Input } from '@ui-kitten/components';

import ItemContext from '../../context/provider/ItemProvider';
import ItemPreview from '../../components/itemPreview';
import IGenericItem from '../../utils/interfaces/IGenericItem';


type SearchScreenType = NativeStackScreenProps<RootStackParamList, 'Search'>;

const FilterScreen = ({ navigation }: SearchScreenType) => {
    const [searchItem, setSearchItem] = useState("");

    const [listToDisplay, setListToDisplay] = useState<IGenericItem[]>([]);

    const {
        state: { items },
    } = useContext(ItemContext);


    const handleChange = (e: string) => {
        setSearchItem(e);
      };

      let counter = 0;
     
    useEffect(() => {
        if ( items && (searchItem !== "" || counter > 0)) {
            counter +=1;
            let list = items.filter((item) => {
               return item.name.includes(searchItem);
             });
             setListToDisplay(list);
         }else{
            setListToDisplay([]);

         }
    }, [searchItem]);

      
  return (
    <View style={styles.container}>
      <View style={styles.headerNav}>
        <Pressable onPress={() => navigation.goBack()}>
            <Icon size={24} name="arrow-left" color="" />
        </Pressable>
            <Input
                textStyle={{color: 'black'}}
                size="large"
                style={styles.input}
                label=""
                
                onChangeText={(value) => handleChange(value)}
                placeholder="Search"
                accessoryRight={() => {
                    return <Icon size={24} name="search" color="black" />;
            }}/>
      </View>
      <ScrollView>
      <View style={styles.containerResult}>
        {listToDisplay.length >0 ?
          listToDisplay.map((manga, index) => (
            <ItemPreview
              key={manga.id}
              item={manga}
              style={{
                marginLeft: (index + 1) % 2 === 0 ? 36 : 0,
              }}
            />
          )) : 
            <View style={styles.noResultsContainer}>
                <Image 
                style={styles.noResultImage}
                    source={require('../../assets/images/message.png')} />
                <Text style={styles.noResults}>There is not data found</Text>
            </View>}
      </View>
    </ScrollView>
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
    containerResult: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: '100%',
      },
    container: {
        padding: 8,
        backgroundColor: '#fff',
        width: '100%',
        flex:1
    },
    noResultsContainer:{
        flex:1,
        justifyContent:'center',
        marginVertical:150,
    },
    noResults:{
        textAlign: 'center',
        fontSize: 16,
        marginVertical:20
    },
    noResultImage: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
  });

  

