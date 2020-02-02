import React from 'react';

import {Container} from 'native-base';
import {Text} from 'react-native-paper';

import appStyles from '../../styles/main';

export default class DiaryRecord extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Новая запись',
    };
  };

  render() {
    return (
      <Container style={appStyles.stackLayout}>
        <Text>Create new record</Text>
      </Container>
    );
  }
}
