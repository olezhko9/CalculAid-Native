import * as React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {List} from 'react-native-paper';
import {Input} from 'native-base';

export default class Settings extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView>
        <List.Item
          title="Углеводов в ХЕ"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View>
              <Input value={'123'} />
            </View>
          )}
        />
        <List.Item
          title="Инсулина на 1ХЕ"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input value={'1.5'} style={{textAlign: 'right'}} />
              <Text style={{lineHeight: 40}}> ед.</Text>
            </View>
          )}
        />
        <List.Item
          title="Низкий сахар"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input value={'3.5'} style={{textAlign: 'right'}} />
              <Text style={{lineHeight: 40}}> ммоль/л</Text>
            </View>
          )}
        />
        <List.Item
          title="Высокий сахар"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input value={'3.5'} style={{textAlign: 'right'}} />
              <Text style={{lineHeight: 40}}> ммоль/л</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
