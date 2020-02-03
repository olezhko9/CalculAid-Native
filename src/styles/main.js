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
  },
  column: {
    flexDirection: 'column',
  },
  pfcChip: {
    marginRight: 16,
    backgroundColor: colors.primary,
  },
  titleIcon: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
});

export default appStyles;
