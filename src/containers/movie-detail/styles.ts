import { colors } from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  line: {
    height: 2,
    marginTop: 35,
    marginBottom: 25,
    backgroundColor: colors.border_e4,
  },
  errorContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  errorTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.gray[500],
  },
  retryButton: {
    minWidth: 150,
    paddingHorizontal: 30,
  },
});

export default styles;
