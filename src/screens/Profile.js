import * as React from 'react';
import {Text} from 'react-native';

export default class Profile extends React.Component {
  render() {
    const {navigation} = this.props;
    return <Text>Hello, {navigation.getParam('name')}</Text>;
  }
}
