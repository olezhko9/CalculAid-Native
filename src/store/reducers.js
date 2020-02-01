import {combineReducers} from 'redux';
import speechProductsReducer from './reducers/speechProducts';
import selectedProductsReducer from './reducers/selectedProducts';
import settings from './reducers/settings';

export default combineReducers({
  speechProducts: speechProductsReducer,
  selectedProducts: selectedProductsReducer,
  settings: settings,
});
