import * as React from 'react';
import {Text} from 'react-native-paper';


export default class DetailedSpeechProduct extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('product', 'Detailed product').name,
    };
  };

  state = {
    product: {
      name: ''
    }
  }

  componentDidMount() {
    this.setState({
      product: this.props.navigation.getParam('product')
    })
  }

  render() {
    return (
      <Text>Detailed: { this.state.product.name }</Text>
    )
  }
}
