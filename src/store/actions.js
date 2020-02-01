export const speechProductsFetched = productsInSpeech => {
  return {
    type: 'SPEECH_PRODUCTS_FETCHED',
    payload: productsInSpeech,
  };
};

export const selectedProductChanged = (productIndex, product) => {
  return {
    type: 'SELECTED_PRODUCT_CHANGED',
    payload: {
      productIndex,
      product,
    },
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

export const productMeasureChanged = (productIndex, measure) => {
  return {
    type: 'PRODUCT_MEASURE_CHANGED',
    payload: {
      productIndex,
      measure,
    },
  };
};

export const settingsUpdated = settings => {
  return {
    type: 'SETTINGS_UPDATED',
    payload: {
      settings,
    },
  };
}
