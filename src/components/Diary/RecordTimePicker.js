import React, {Component} from 'react';
import moment from 'moment';
import ruLocale from 'moment/locale/ru';
moment.locale('ru', ruLocale);

import {View, Text, StyleSheet} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import appStyles from '../../styles/main';

class RecordTimePicker extends Component {
  state = {
    fullDate: new Date(),
    mode: 'date',
    show: false,
    date: moment().format('LL'),
    time: moment().format('LT'),
  };

  setDateTime = (event, fullDate) => {
    const {mode} = this.state;
    fullDate = fullDate || this.state.fullDate;

    this.setState({
      time: mode === 'time' ? moment(fullDate).format('LT') : this.state.time,
      date: mode === 'date' ? moment(fullDate).format('LL') : this.state.date,
      show: false,
      fullDate,
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  showDatepicker = () => {
    this.show('date');
  };

  showTimepicker = () => {
    this.show('time');
  };

  render() {
    const {show, mode, fullDate, date, time} = this.state;
    return (
      <Card style={{marginBottom: 10}}>
        <Card.Title
          title="Время"
          left={() => (
            <IconButton
              icon="calendar"
              style={[appStyles.titleIcon]}
              color={'#fff'}
            />
          )}
        />
        <Card.Content>
          <View style={[appStyles.row, {justifyContent: 'center'}]}>
            <Text
              onPress={this.showDatepicker}
              style={[styles.timeText, appStyles.editUnderline]}>
              {date}
            </Text>
            <Text style={[styles.timeText]}> в </Text>
            <Text
              onPress={this.showTimepicker}
              style={[styles.timeText, appStyles.editUnderline]}>
              {time}
            </Text>
          </View>
          {show && (
            <DateTimePicker
              value={fullDate}
              mode={mode}
              is24Hour={true}
              display="default"
              locale="ru-RU"
              onChange={this.setDateTime}
            />
          )}
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  timeText: {
    fontSize: 20,
  },
});

export default RecordTimePicker;
