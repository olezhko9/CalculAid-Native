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
import {
  selectedProductChanged,
  productAmountChanged,
  productMeasureChanged,
} from '../store/actions';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

class DetailedSpeechProduct extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: capitalize(navigation.getParam('title', 'Product name')),
    };
  };

  constructor(props) {
    super(props);
    const productIndex = props.navigation.getParam('changeProductIndex');
    this.state = {
      productIndex: props.navigation.getParam('changeProductIndex'),
      productsData: props.productsInSpeech[productIndex],
    };

    props.navigation.setParams({
      title: capitalize(props.selectedProducts[productIndex].product.name),
    });
  }

  onProductChanged = product => {
    this.props.selectedProductChanged(
      this.props.navigation.getParam('changeProductIndex'),
      product,
    );

    this.props.navigation.setParams({
      title: capitalize(product.name),
    });
  };

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

  onMeasureChanged = measure => {
    this.props.productMeasureChanged(
      this.props.navigation.getParam('changeProductIndex'),
      measure,
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
              onValueChange={product => this.onProductChanged(product)}>
              {this.state.productsData.products.map(product => (
                <Picker.Item
                  key={product.id}
                  label={product.name}
                  value={product}
                />
              ))}
            </Picker>

            <View style={[appStyles.row]}>
              <Chip style={[appStyles.pfcChip]} textStyle={{color: '#fff'}}>
                {`Б: ${
                  this.props.selectedProducts[this.state.productIndex].product
                    .pfc.p
                }`}
              </Chip>
              <Chip style={[appStyles.pfcChip]} textStyle={{color: '#fff'}}>
                {`Ж: ${
                  this.props.selectedProducts[this.state.productIndex].product
                    .pfc.f
                }`}
              </Chip>
              <Chip style={[appStyles.pfcChip]} textStyle={{color: '#fff'}}>
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

            <Picker
              selectedValue={
                this.props.selectedProducts[this.state.productIndex].product
                  .measure
              }
              onValueChange={measure => this.onMeasureChanged(measure)}>
              {this.props.selectedProducts[
                this.state.productIndex
              ].product.measures.map(measure => (
                <Picker.Item
                  key={measure.id}
                  label={measure.name}
                  value={measure}
                />
              ))}
            </Picker>
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
    color: '#fff',
  },
  chip: {
    marginRight: 16,
  },
});

const mapStateToProps = state => {
  return {
    productsInSpeech: state.speechProducts,
    selectedProducts: state.selectedProducts,
  };
};

export default connect(
  mapStateToProps,
  {
    productAmountChanged,
    selectedProductChanged,
    productMeasureChanged,
  },
)(DetailedSpeechProduct);
