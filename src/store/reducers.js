import {combineReducers} from 'redux';

const INITIAL_STATE = {
  productsInSpeech: [],
};

const speechProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SPEECH_PRODUCTS_FETCHED':
      return {
        ...state,
        productsInSpeech: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  speech: speechProductsReducer,
});
