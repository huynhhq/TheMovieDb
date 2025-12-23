import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';
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
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  loadMoreButton: {
    width: '100%',
  },
  loadMoreButtonText: {
    fontSize: 24,
    color: colors.white,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
});

export default styles;
