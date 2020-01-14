import * as React from 'react';
import { View, Button } from 'react-native';

export default class Diary extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Oleg'})}
        />
      </View>
    );
  }
}

