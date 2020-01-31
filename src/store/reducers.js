import {combineReducers} from 'redux';
import speechProductsReducer from './reducers/speechProducts';
import selectedProductsReducer from './reducers/selectedProducts';

export default combineReducers({
  speechProducts: speechProductsReducer,
  selectedProducts: selectedProductsReducer,
});
