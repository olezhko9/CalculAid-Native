import {combineReducers} from 'redux';
import speechProductsReducer from './reducers/speechProducts';

export default combineReducers({
  products: speechProductsReducer,
});
