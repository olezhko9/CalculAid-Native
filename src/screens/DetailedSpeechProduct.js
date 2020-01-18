import * as React from 'react';
import {
  StyleSheet,
  View,
  Picker,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Chip, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';

import appStyles from '../styles/main';
import {productAmountChanged} from '../store/actions';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class DetailedSpeechProduct extends React.Component {
  constructor(props) {
    super(props);
    const productIndex = this.props.navigation.getParam('changeProductIndex');
    this.state = {
      productIndex: this.props.navigation.getParam('changeProductIndex'),
      productsData: this.props.productsInSpeech[productIndex],
    };
  }
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: navigation.getParam('product', 'Detailed product').name,
  //   };
  // };

  updateAmount = amount => {
    this.props.productAmountChanged(
      this.props.navigation.getParam('changeProductIndex'),
      this.props.selectedProducts[this.state.productIndex].amount + amount,
    );
  };

  onAmountChanged = amount => {
    this.props.productAmountChanged(
      this.props.navigation.getParam('changeProductIndex'),
      +amount,
    );
  };

  render() {
    if (this.state.productsData) {
      return (
        <DismissKeyboard>
          <View style={appStyles.stackLayout}>
            <Picker
              selectedValue={
                this.props.selectedProducts[this.state.productIndex].product
              }
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedProduct: itemValue})
              }>
              {this.state.productsData.products.map(product => (
                <Picker.Item
                  key={product.id}
                  label={product.name}
                  value={product}
                />
              ))}
            </Picker>

            <View style={[appStyles.row]}>
              <Chip style={[styles.chip]}>
                {`Б: ${
                  this.props.selectedProducts[this.state.productIndex].product
                    .pfc.p
                }`}
              </Chip>
              <Chip style={[styles.chip]}>
                {`Ж: ${
                  this.props.selectedProducts[this.state.productIndex].product
                    .pfc.f
                }`}
              </Chip>
              <Chip style={[styles.chip]}>
                {`У: ${
                  this.props.selectedProducts[this.state.productIndex].product
                    .pfc.c
                }`}
              </Chip>
            </View>

            <View style={[appStyles.row]}>
              <TextInput
                label="Введите количество"
                style={{backgroundColor: 'transparent', flex: 1}}
                keyboardType={'numeric'}
                value={this.props.selectedProducts[
                  this.state.productIndex
                ].amount.toString()}
                onChangeText={amount => this.onAmountChanged(amount)}
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

const mapStateToProps = state => {
  return {
    productsInSpeech: state.products.productsInSpeech,
    selectedProducts: state.selectedProducts,
  };
};

export default connect(
  mapStateToProps,
  {
    productAmountChanged,
  },
)(DetailedSpeechProduct);
