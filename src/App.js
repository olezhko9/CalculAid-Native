import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Diary from './screens/Diary';
import DiaryRecord from './screens/DiaryRecord';
import Settings from './screens/Settings';
import Calculator from './screens/Calculator';
import DetailedSpeechProduct from './screens/DetailedSpeechProduct';

import CalcButton from './components/CalcButton';

import theme from './styles/theme';

const defaultStackNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.colors.primary,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  },
};

const DiaryStackNavigator = createStackNavigator(
  {
    Diary: {
      screen: Diary,
    },
    DiaryRecord: {
      screen: DiaryRecord,
    },
  },
  {...defaultStackNavigationOptions},
);

const CalculatorStackNavigator = createStackNavigator(
  {
    CalculatorStack: {
      screen: Calculator,
    },
    DetailedSpeechProduct: {
      screen: DetailedSpeechProduct,
    },
  },
  {
    ...defaultStackNavigationOptions,
  },
);

const SettingsStackNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings,
    },
  },
  {...defaultStackNavigationOptions},
);

const TabNavigator = createBottomTabNavigator(
  {
    Diary: {
      screen: DiaryStackNavigator,
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
    Settings: {
      screen: SettingsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => <Icon name={'cog'} size={24} />,
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
