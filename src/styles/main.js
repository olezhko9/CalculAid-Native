import {StyleSheet} from 'react-native';
import theme from './theme';

const {colors} = theme;

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
