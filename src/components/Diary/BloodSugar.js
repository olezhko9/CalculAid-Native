import React, {Component} from 'react';

import {StyleSheet} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import TickSlider from '../TickSlider';

import theme from '../../styles/theme';
import appStyles from '../../styles/main';

class BloodSugar extends Component {
  state = {
    bloodSugarWhole: 0,
    bloodSugarFrac: 0.0,
    wholeMarks: [...new Array(11)].map((_, i) => ({
      name: i * 2,
      value: i * 2,
    })),
    fracMarks: [...new Array(10)].map((_, i) => ({
      name: Math.floor(i * 0.1 * 10) / 10,
      value: i * 0.1,
    })),
  };

  render() {
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
          <Text style={[styles.bloodSugarText]}>
            {(this.state.bloodSugarWhole + this.state.bloodSugarFrac).toFixed(1)}
            {' ммоль/л'}
          </Text>
          <TickSlider
            step={1}
            min={0}
            max={20}
            marks={this.state.wholeMarks}
            thumbTintColor={theme.colors.primary}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={'#999'}
            onChange={value => this.setState({bloodSugarWhole: value})}
          />
          <TickSlider
            step={0.1}
            min={0.0}
            max={0.9}
            marks={this.state.fracMarks}
            thumbTintColor={theme.colors.primary}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={'#999'}
            onChange={value => this.setState({bloodSugarFrac: value})}
          />
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  bloodSugarText: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 24,
  },
});

export default BloodSugar;
