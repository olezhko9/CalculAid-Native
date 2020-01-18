export default (state = [], action) => {
  switch (action.type) {
    case 'SPEECH_PRODUCTS_FETCHED':
      return action.payload.map(product => {
        return {
          amount: product.amount,
          product: product.products[0],
        };
      });
    case 'PRODUCT_AMOUNT_CHANGED':
      return state.map((product, index) => {
        if (index === action.payload.productIndex) {
          return {
            ...product,
            amount: action.payload.amount,
          };
        }
        return product;
      });
    default:
      return state;
  }
};
