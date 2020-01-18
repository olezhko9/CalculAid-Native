export const speechProductsFetched = productsInSpeech => {
  return {
    type: 'SPEECH_PRODUCTS_FETCHED',
    payload: productsInSpeech,
  };
};

export const productAmountChanged = (productIndex, amount) => {
  return {
    type: 'PRODUCT_AMOUNT_CHANGED',
    payload: {
      productIndex,
      amount,
    },
  };
};
