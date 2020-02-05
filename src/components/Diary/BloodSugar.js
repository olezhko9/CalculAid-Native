import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {Input, Item} from 'native-base';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import TickSlider from '../TickSlider';

import theme from '../../styles/theme';
import appStyles from '../../styles/main';

class BloodSugar extends Component {
  state = {
    bloodSugarWhole: 0.0,
    bloodSugarFrac: 0.0,
    bloodSugar: '0.0',
    wholeMarks: [...new Array(11)].map((_, i) => ({
      name: i * 2,
      value: i * 2,
    })),
    fracMarks: [...new Array(10)].map((_, i) => ({
      name: Math.floor(i * 0.1 * 10) / 10,
      value: i,
    })),
  };

  onBloodSugarValueChanged = async value => {
    if (value !== undefined) {
      const re = /^\d{0,2}\.*\d?$/;

      if (value.length === 0) {
        this.setState({
          bloodSugar: value,
          bloodSugarWhole: 0,
          bloodSugarFrac: 0,
        });
      } else if (re.test(value)) {
        const nums = value.split('.');
        this.setState({
          bloodSugar: value,
          bloodSugarWhole: +nums[0],
          bloodSugarFrac: nums[1] ? +nums[1] / 10 : 0,
        });
      }
    } else {
      await this.setState({
        bloodSugar: String(
          this.state.bloodSugarWhole + this.state.bloodSugarFrac,
        ),
      });
    }
  };

  render() {
    const maxSugar = 20;
    return (
      <Card style={{marginBottom: 10}}>
        <Card.Title
          title="Сахар"
          left={() => (
            <IconButton
              icon={props => (
                <FontistoIcon {...props} name={'blood-drop'} size={15} />
              )}
              style={[appStyles.titleIcon]}
              color={'#fff'}
            />
          )}
        />
        <Card.Content>
          <View
            style={[
              appStyles.row,
              {justifyContent: 'center', marginBottom: 10},
            ]}>
            <View inlineLabel style={{width: 65}}>
              <Input
                keyboardType={'decimal-pad'}
                value={this.state.bloodSugar}
                style={[
                  appStyles.editUnderline,
                  {fontSize: 24, textAlign: 'center', paddingVertical: 0},
                ]}
                onChangeText={text => this.onBloodSugarValueChanged(text)}
              />
            </View>
            <Text style={[styles.bloodSugarText]}>{'ммоль/л'}</Text>
          </View>
          <TickSlider
            value={
              this.state.bloodSugarWhole <= maxSugar
                ? this.state.bloodSugarWhole
                : maxSugar
            }
            step={1}
            min={0}
            max={maxSugar}
            marks={this.state.wholeMarks}
            thumbTintColor={theme.colors.primary}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={'#999'}
            onChange={async value => {
              await this.setState({bloodSugarWhole: value});
              this.onBloodSugarValueChanged();
            }}
          />
          <TickSlider
            value={this.state.bloodSugarFrac * 10}
            step={1}
            min={0}
            max={9}
            marks={this.state.fracMarks}
            thumbTintColor={theme.colors.primary}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={'#999'}
            onChange={async value => {
              await this.setState({bloodSugarFrac: value / 10});
              this.onBloodSugarValueChanged();
            }}
          />
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  bloodSugarText: {
    textAlign: 'center',
    fontSize: 22,
  },
});

export default BloodSugar;
