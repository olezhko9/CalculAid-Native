import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/store/reducers';

import App from './src/App';
import {name as appName} from './app.json';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

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
