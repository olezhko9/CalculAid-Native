export const speechProductsFetched = productsInSpeech => {
  return {
    type: 'SPEECH_PRODUCTS_FETCHED',
    payload: productsInSpeech,
  };
};
