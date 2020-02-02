import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from 'native-base';
import {Card, IconButton, Text} from 'react-native-paper';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import appStyles from '../styles/main';
import theme from '../styles/theme';

export default class Diary extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Дневник',
    };
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={appStyles.stackLayout}>
        <Card>
          <Card.Content>
            <Text style={{textAlign: 'center', marginBottom: 8}}>
              Новая запись
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingLeft: 30,
                paddingRight: 30,
              }}>
              <IconButton
                icon={props => (
                  <MaterialCommunityIcon {...props} name={'food'} size={25} />
                )}
                style={styles.btn}
                color={'#fff'}
                onPress={() => navigate('DiaryRecord')}
              />
              <IconButton
                icon={props => (
                  <FontistoIcon {...props} name={'blood-drop'} size={20} />
                )}
                style={[styles.btn, {width: 70, height: 70}]}
                color={'#fff'}
                onPress={() => navigate('DiaryRecord')}
              />
              <IconButton
                icon={props => (
                  <FontistoIcon
                    {...props}
                    name={'injection-syringe'}
                    size={20}
                  />
                )}
                style={styles.btn}
                color={'#fff'}
                onPress={() => navigate('DiaryRecord')}
              />
            </View>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
});
