import * as React from 'react';
import {View, Button} from 'react-native';

import appStyles from '../styles/main';

export default class Diary extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Дневник',
    };
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={appStyles.stackLayout}>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Oleg'})}
        />
      </View>
    );
  }
}
