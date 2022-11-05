import { Card, Avatar } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/Themed';

const ItemList = (data: any) => {
  console.log(data);
  const renderItemHeader = (headerProps: any, info: any) => (
    <View {...headerProps} style={styles.title}>
      <Avatar size='giant' source={require('../../assets/images/icon.png')} />
      <Text style={{marginLeft: 4}}>{info.item.name}</Text>
    </View>
  );

  const renderItemFooter = (footerProps: any) => (
    <Text {...footerProps}>By Wikipedia</Text>
  );

  return (
    <Card
      style={styles.item}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, data)}
      footer={renderItemFooter}
    >
      <Text>{data.item.description}</Text>
    </Card>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
