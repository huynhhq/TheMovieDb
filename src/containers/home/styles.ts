import { colors } from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: colors.white,
  },
  filterContainer: {
    gap: 15,
    marginTop: 18,
    marginBottom: 25,
    paddingHorizontal: 30,
  },
  searchButton: {
    marginTop: 5,
  },
  contentContainer: {
    gap: 20,
  },
});

export default styles;
