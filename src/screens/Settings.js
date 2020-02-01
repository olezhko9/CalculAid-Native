import * as React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {List} from 'react-native-paper';
import {Input} from 'native-base';

import {connect} from 'react-redux';
import {settingsUpdated} from '../store/actions';

class Settings extends React.Component {
  onSettingsUpdated = settings => {
    this.props.settingsUpdated(settings);
  };

  render() {
    const {navigation, settings} = this.props;
    return (
      <SafeAreaView>
        <List.Item
          title="Углеводов в ХЕ"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input
                value={settings.carbonPerBU}
                style={{textAlign: 'right'}}
                onChangeText={text =>
                  this.onSettingsUpdated({carbonPerBU: text})
                }
              />
              <Text style={{lineHeight: 40}}> г</Text>
            </View>
          )}
        />
        <List.Item
          title="Инсулина на 1ХЕ"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input
                value={settings.insulinPerBU}
                style={{textAlign: 'right'}}
                onChangeText={text =>
                  this.onSettingsUpdated({insulinPerBU: text})
                }
              />
              <Text style={{lineHeight: 40}}> ед.</Text>
            </View>
          )}
        />
        <List.Item
          title="Низкий сахар"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input
                value={settings.minSugar}
                style={{textAlign: 'right'}}
                onChangeText={text => this.onSettingsUpdated({minSugar: text})}
              />
              <Text style={{lineHeight: 40}}> ммоль/л</Text>
            </View>
          )}
        />
        <List.Item
          title="Высокий сахар"
          left={props => <List.Icon {...props} icon="folder" />}
          right={() => (
            <View style={{flexDirection: 'row', minWidth: 150}}>
              <Input
                value={settings.maxSugar}
                style={{textAlign: 'right'}}
                onChangeText={text => this.onSettingsUpdated({maxSugar: text})}
              />
              <Text style={{lineHeight: 40}}> ммоль/л</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  {
    settingsUpdated,
  },
)(Settings);
