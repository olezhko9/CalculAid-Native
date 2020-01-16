import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
  stackLayout: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10
  },
  column: {
    flexDirection: 'column',
  },
});

export default appStyles;
