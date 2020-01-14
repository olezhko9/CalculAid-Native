import * as React from 'react';
import axios from 'axios';

import {List, Divider, Text, Chip, Button} from 'react-native-paper';
import {StyleSheet, FlatList, View} from 'react-native';


export default class Calculator extends React.Component {
  state = {
    products: [],
    speech: 'Я съел 2 куска ржаного хлеба еще я съел десять чайных ложек варенного риса а еще выпил двести миллилитров апельсинного сока и еще выпил стакан козьего молока а еще я съел одно яблоко',
  };

  async getData() {
    try {
      const response = (await axios.post('http://194.87.101.20:3000/api/products', {
        speech: this.state.speech,
      })).data;
      this.setState({
        products: response.data,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const products = this.state.products;
    console.log(products);
    return (
      <View>
        <Button icon={'microphone'} mode={'contained'} onPress={this.getData.bind(this)}>Рассказать</Button>
        {!!products.length &&
        <FlatList
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => (
            <List.Item
              title={item.products[0].name.charAt(0).toUpperCase() + item.products[0].name.slice(1)}
              titleNumberOfLines={2}
              titleStyle={{fontWeight: 'bold', fontSize: 18}}
              description={() => (
                <View>
                  <View style={[styles.row, {paddingTop: 8}]}>
                    <Text>{`Количество: ${item.amount} ${item.products[0].measures[0].name}`}</Text>
                  </View>
                  <View style={[styles.row, {paddingTop: 8}]}>
                    <Chip style={[styles.chip]}>
                      {`Б: ${item.products[0].pfc.p}`}
                    </Chip>
                    <Chip style={[styles.chip]}>
                      {`Ж: ${item.products[0].pfc.f}`}
                    </Chip>
                    <Chip style={[styles.chip]}>
                      {`У: ${item.products[0].pfc.c}`}
                    </Chip>
                  </View>
                </View>
              )}
              right={props => (
                <View style={[styles.column, {justifyContent: 'center'}]}>
                  <Button onPress={() => console.log('Pressed')}>
                    Сменить
                  </Button>
                </View>
              )}>
            </List.Item>
          )}
          keyExtractor={(item) => item.products[0].id.toString()}
          data={this.state.products}
        />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  chip: {
    marginRight: 16,
  },
});
