import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

const {colors} = DefaultTheme;
console.log(colors);

const appStyles = StyleSheet.create({
  stackLayout: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  column: {
    flexDirection: 'column',
  },
  pfcChip: {
    marginRight: 16,
    backgroundColor: colors.primary,
  },
});

export default appStyles;
