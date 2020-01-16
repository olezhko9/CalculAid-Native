import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CalcButton from './components/CalcButton';

import Diary from './screens/Diary';
import Profile from './screens/Profile';
import Calculator from './screens/Calculator';
import DetailedSpeechProduct from './screens/DetailedSpeechProduct';

const CalculatorStackNavigator = createStackNavigator({
  CalculatorStack: {
    screen: Calculator,
  },
  DetailedSpeechProduct: {
    screen: DetailedSpeechProduct,
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Diary: {
      screen: Diary,
      navigationOptions: {
        tabBarIcon: () => <Icon name={'book'} size={24} />,
      },
    },
    Calculator: {
      screen: CalculatorStackNavigator,
      navigationOptions: {
        tabBarIcon: <CalcButton />,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: () => <Icon name={'user'} size={24} />,
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      keyboardHidesTabBar: false,
    },
  },
);

export default createAppContainer(TabNavigator);
