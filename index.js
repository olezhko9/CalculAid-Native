import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/store';

export default function Main() {
  return (
    <PaperProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
