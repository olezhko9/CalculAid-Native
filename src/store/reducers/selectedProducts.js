export default (state = [], action) => {
  switch (action.type) {
    case 'SPEECH_PRODUCTS_FETCHED':
      return action.payload.map(product => {
        return {
          amount: product.amount,
          product: product.products[0],
        };
      });

    case 'SELECTED_PRODUCT_CHANGED':
      return state.map((product, index) => {
        if (index === action.payload.productIndex) {
          return {
            ...product,
            product: action.payload.product,
          };
        }
        return product;
      });

    case 'PRODUCT_AMOUNT_CHANGED':
      if (action.payload.amount < 0) {
        action.payload.amount = 0;
      }
      return state.map((product, index) => {
        if (index === action.payload.productIndex) {
          return {
            ...product,
            amount: action.payload.amount,
          };
        }
        return product;
      });

    case 'PRODUCT_MEASURE_CHANGED':
      return state.map((product, index) => {
        if (index === action.payload.productIndex) {
          return {
            amount: product.amount,
            product: {
              ...product.product,
              measure: action.payload.measure,
            },
          };
        }
        return product;
      });

    default:
      return state;
  }
};
