import * as React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {List} from 'react-native-paper';
import {Input} from 'native-base';

import {connect} from 'react-redux';
import {settingsUpdated} from '../store/actions';

const SettingIcon = props => {
  let Icon = null;
  if (props.type === 'FontAwesome5') {
    Icon = <FontAwesomeIcon {...props} size={20} />;
  } else if (props.type === 'FontistoIcon') {
    Icon = <FontistoIcon {...props} size={20} />;
  }
  return (
    <View
      style={{paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
      {Icon}
    </View>
  );
};

class Settings extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Настройки',
    };
  };

  onSettingsUpdated = settings => {
    this.props.settingsUpdated(settings);
  };

  render() {
    const {navigation, settings} = this.props;
    return (
      <SafeAreaView>
        <List.Section>
          <List.Subheader>Коэффициенты</List.Subheader>
          <List.Item
            title="Углеводов в ХЕ"
            left={props => (
              <SettingIcon
                {...props}
                type={'FontAwesome5'}
                name={'bread-slice'}
              />
            )}
            right={() => (
              <View style={styles.settingEdit}>
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
            left={props => (
              <SettingIcon
                {...props}
                type={'FontistoIcon'}
                name={'injection-syringe'}
              />
            )}
            right={() => (
              <View style={styles.settingEdit}>
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
        </List.Section>
        <List.Section>
          <List.Subheader>Сахар</List.Subheader>
          <List.Item
            title="Низкий сахар"
            left={props => (
              <SettingIcon
                {...props}
                type={'FontistoIcon'}
                name={'blood-drop'}
              />
            )}
            right={() => (
              <View style={styles.settingEdit}>
                <Input
                  value={settings.minSugar}
                  style={{textAlign: 'right'}}
                  onChangeText={text =>
                    this.onSettingsUpdated({minSugar: text})
                  }
                />
                <Text style={{lineHeight: 40}}> ммоль/л</Text>
              </View>
            )}
          />
          <List.Item
            title="Высокий сахар"
            left={props => (
              <SettingIcon
                {...props}
                type={'FontistoIcon'}
                name={'blood-drop'}
              />
            )}
            right={() => (
              <View style={styles.settingEdit}>
                <Input
                  value={settings.maxSugar}
                  style={{textAlign: 'right'}}
                  onChangeText={text =>
                    this.onSettingsUpdated({maxSugar: text})
                  }
                />
                <Text style={{lineHeight: 40}}> ммоль/л</Text>
              </View>
            )}
          />
        </List.Section>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  settingEdit: {
    flexDirection: 'row',
    minWidth: 150,
    paddingRight: 10,
  },
});

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
