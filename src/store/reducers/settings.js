import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  carbonPerBU: '10',
  insulinPerBU: '1.0',
  minSugar: '3.5',
  maxSugar: '7.0',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SETTINGS_UPDATED':
      if (action.payload.settings.carbonPerBU) {
        AsyncStorage.setItem(
          'carbonPerBU',
          action.payload.settings.carbonPerBU,
        );
      }
      if (action.payload.settings.insulinPerBU) {
        AsyncStorage.setItem(
          'insulinPerBU',
          action.payload.settings.insulinPerBU,
        );
      }
      if (action.payload.settings.minSugar) {
        AsyncStorage.setItem('minSugar', action.payload.settings.minSugar);
      }
      if (action.payload.settings.maxSugar) {
        AsyncStorage.setItem('maxSugar', action.payload.settings.maxSugar);
      }
      return {
        ...state,
        carbonPerBU: action.payload.settings.carbonPerBU || state.carbonPerBU,
        insulinPerBU: action.payload.settings.insulinPerBU || state.insulinPerBU,
        minSugar: action.payload.settings.minSugar || state.minSugar,
        maxSugar: action.payload.settings.maxSugar || state.maxSugar,
      };
    default:
      return state;
  }
};
