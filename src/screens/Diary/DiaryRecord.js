import React from 'react';

import {Container} from 'native-base';
import BloodSugar from '../../components/Diary/BloodSugar';

import appStyles from '../../styles/main';

export default class DiaryRecord extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Новая запись',
    };
  };

  render() {
    const type = this.props.navigation.getParam('type', 'bloodSugar');

    return (
      <Container style={[appStyles.stackLayout, {backgroundColor: '#efefef'}]}>
        <BloodSugar />
      </Container>
    );
  }
}
