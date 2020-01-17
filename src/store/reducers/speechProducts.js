const INITIAL_STATE = {
  productsInSpeech: [],
};

export default (state = INITIAL_STATE, action) => {
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
