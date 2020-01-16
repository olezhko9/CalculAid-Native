import * as React from 'react';
import {
  StyleSheet,
  View,
  Picker,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Chip, Button, TextInput} from 'react-native-paper';

import appStyles from '../styles/main';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class DetailedSpeechProduct extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: navigation.getParam('product', 'Detailed product').name,
  //   };
  // };

  state = {
    language: 'java',
  };

  componentDidMount() {
    this.setState({
      product: this.props.navigation.getParam('product'),
      selectedProduct: this.props.navigation.getParam('product').products[0],
    });
  }

  updateAmount(value) {
    this.setState({
      product: {
        ...this.state.product,
        amount: this.state.product.amount + value,
      },
    });
  }

  render() {
    if (this.state.product) {
      return (
        <DismissKeyboard>
          <View style={appStyles.stackLayout}>
            <Picker
              selectedValue={this.state.selectedProduct}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedProduct: itemValue})
              }>
              {this.state.product.products.map(product => (
                <Picker.Item
                  key={product.id}
                  label={product.name}
                  value={product}
                />
              ))}
            </Picker>

            <View style={[appStyles.row]}>
              <Chip style={[styles.chip]}>
                {`Б: ${this.state.selectedProduct.pfc.p}`}
              </Chip>
              <Chip style={[styles.chip]}>
                {`Ж: ${this.state.selectedProduct.pfc.f}`}
              </Chip>
              <Chip style={[styles.chip]}>
                {`У: ${this.state.selectedProduct.pfc.c}`}
              </Chip>
            </View>

            <View style={[appStyles.row]}>
              <TextInput
                label="Введите количество"
                style={{backgroundColor: 'transparent', flex: 1}}
                keyboardType={'numeric'}
                value={this.state.product.amount.toString()}
                onChangeText={text =>
                  this.setState({
                    product: {...this.state.product, amount: parseFloat(text)},
                  })
                }
              />
            </View>

            <View style={[appStyles.row, {justifyContent: 'space-between'}]}>
              {[-100, -10, -1, 1, 10, 100].map(value => (
                <Button
                  compact
                  key={value}
                  mode={'contained'}
                  style={[styles.amountButton]}
                  onPress={() => this.updateAmount(value)}>
                  {value < 0 ? value : `+${value}`}
                </Button>
              ))}
            </View>
          </View>
        </DismissKeyboard>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  amountButton: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  chip: {
    marginRight: 16,
  },
});
