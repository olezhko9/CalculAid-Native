import * as React from 'react';

import {View} from 'react-native';
import {Chip, IconButton, List, Text} from 'react-native-paper';

import theme from '../../styles/theme';
import appStyles from '../../styles/main';

const SpeechProductListItem = ({item, index, navigation}) => {
  const {navigate} = navigation;
  return (
    <List.Item
      title={
        item.product.name.charAt(0).toUpperCase() + item.product.name.slice(1)
      }
      titleNumberOfLines={2}
      titleStyle={{fontWeight: 'bold', fontSize: 18}}
      style={{backgroundColor: theme.colors.background}}
      description={() => (
        <View>
          <View style={[appStyles.row, {paddingTop: 8}]}>
            <Text>{`Количество: ${item.amount} ${
              item.product.measure.name
            }`}</Text>
          </View>
          <View style={[appStyles.row, {paddingTop: 8}]}>
            <Chip style={[appStyles.pfcChip]} textStyle={{color: '#fff'}}>
              {`Б: ${item.product.pfc.p}`}
            </Chip>
            <Chip style={[appStyles.pfcChip]} textStyle={{color: '#fff'}}>
              {`Ж: ${item.product.pfc.f}`}
            </Chip>
            <Chip style={[appStyles.pfcChip]} textStyle={{color: '#fff'}}>
              {`У: ${item.product.pfc.c}`}
            </Chip>
          </View>
        </View>
      )}
      right={() => (
        <View style={[appStyles.column, {justifyContent: 'center'}]}>
          <IconButton icon={'chevron-right'} />
        </View>
      )}
      onPress={() =>
        navigate('DetailedSpeechProduct', {
          changeProductIndex: index,
        })
      }
      onLongPress={() => {}}
    />
  );
};

export default SpeechProductListItem;
