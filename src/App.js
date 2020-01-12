import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Tab1 from './components/Tab1';

// const calculatorRoute = () => <Text>calculator</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'calculator', title: 'Калькулятор', icon: 'calculator' },
      { key: 'albums', title: 'Дневник', icon: 'book' },
      { key: 'recents', title: 'Статистика', icon: 'chart-bar' },
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    calculator: Tab1,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
