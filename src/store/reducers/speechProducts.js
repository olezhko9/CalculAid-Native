export default (state = [], action) => {
  switch (action.type) {
    case 'SPEECH_PRODUCTS_FETCHED':
      return action.payload;
    case 'SPEECH_PRODUCT_REMOVED':
      return state.filter(
        (item, index) => index !== action.payload.productIndex,
      );
    default:
      return state;
  }
};
