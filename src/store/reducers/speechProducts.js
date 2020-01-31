export default (state = [], action) => {
  switch (action.type) {
    case 'SPEECH_PRODUCTS_FETCHED':
      return action.payload;
    default:
      return state;
  }
};
