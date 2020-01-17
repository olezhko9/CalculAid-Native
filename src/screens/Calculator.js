import * as React from 'react';
import {connect} from 'react-redux';
import {speechProductsFetched} from '../store/actions';
import axios from 'axios';

import {
  Colors,
  ActivityIndicator,
  List,
  Divider,
  Text,
  Chip,
  Button,
} from 'react-native-paper';
import {StyleSheet, FlatList, View} from 'react-native';

import appStyles from '../styles/main';

class Calculator extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    loading: false,
    speech:
      'Я съел 2 куска ржаного хлеба еще я съел десять чайных ложек варенного риса а еще выпил двести миллилитров апельсинного сока и еще выпил стакан козьего молока а еще я съел одно яблоко',
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.setState({loading: true});
    try {
      const response = (await axios.post(
        'http://194.87.101.20:3000/api/products',
        {
          speech: this.state.speech,
        },
      )).data;
      this.props.speechProductsFetched(response.data);
    } catch (e) {
      console.log(e);
    }
    this.setState({loading: false});
  }

  render() {
    const {navigate} = this.props.navigation;
    const {productsInSpeech} = this.props;
    return (
      <View style={appStyles.stackLayout}>
        <Button
          icon={'microphone'}
          mode={'contained'}
          onPress={this.getData.bind(this)}>
          Рассказать
        </Button>
        {this.state.loading && (
          <ActivityIndicator
            animating={this.state.loading}
            color={Colors.red800}
          />
        )}
        {!!productsInSpeech.length && (
          <FlatList
            style={{paddingTop: 10}}
            ItemSeparatorComponent={Divider}
            keyExtractor={item => item.products[0].id.toString()}
            data={productsInSpeech}
            renderItem={({item, index}) => (
              <List.Item
                title={
                  item.products[0].name.charAt(0).toUpperCase() +
                  item.products[0].name.slice(1)
                }
                titleNumberOfLines={2}
                titleStyle={{fontWeight: 'bold', fontSize: 18}}
                description={() => (
                  <View>
                    <View style={[styles.row, {paddingTop: 8}]}>
                      <Text>{`Количество: ${item.amount} ${
                        item.products[0].measures[0].name
                      }`}</Text>
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
                    <Button
                      onPress={() =>
                        navigate('DetailedSpeechProduct', {
                          changeProductIndex: index,
                        })
                      }>
                      Изменить
                    </Button>
                  </View>
                )}
              />
            )}
          />
        )}
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

const mapStateToProps = state => {
  return {
    productsInSpeech: state.products.productsInSpeech,
  };
};

export default connect(
  mapStateToProps,
  {
    speechProductsFetched,
  },
)(Calculator);
