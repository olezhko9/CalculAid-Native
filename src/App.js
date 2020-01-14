import React, {Component} from 'react';
import {createAppContainer, } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome5';
import CalcButton from './components/CalcButton';

import Diary from './screens/Diary';
import Profile from './screens/Profile';
import Calculator from './screens/Calculator';

const TabNavigator = createBottomTabNavigator(
  {
    Diary: {
      screen: Diary,
      navigationOptions: {
        tabBarIcon: () => <Icon name={'book'} size={24}/>
      }
    },
    Calculator: {
      screen: Calculator,
      navigationOptions: {
        tabBarIcon: <CalcButton />,
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: () => <Icon name={'user'} size={24}/>
      }
    },
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
)

export default createAppContainer(TabNavigator);

