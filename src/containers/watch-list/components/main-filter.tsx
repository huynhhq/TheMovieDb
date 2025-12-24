import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

// components
import { MovieOrder, MovieSort } from '.';
import { AppText } from '@components/uikit';

// context
import {
  useFilterWatchlistCommit,
  useFilterWatchlistSelector,
} from '../context';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

const MainFilter: React.FC = () => {
  const commit = useFilterWatchlistCommit();
  const order = useFilterWatchlistSelector(state => state.params.order);
  const sortBy = useFilterWatchlistSelector(state => state.params.sort_by);

  const handleSortChange = useCallback(
    (value: string) => {
      commit(prev => ({
        params: {
          ...prev.params,
          sort_by: value,
        },
      }));
    },
    [commit],
  );

  const handleOrderChange = useCallback(
    (value: string) => {
      commit(prev => ({
        params: {
          ...prev.params,
          order: value,
        },
      }));
    },
    [commit],
  );

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>My Watchlist:</AppText>
      <View style={styles.filterContainer}>
        <AppText style={styles.filterTitle}>Filter by:</AppText>
        <MovieSort value={sortBy} onChange={handleSortChange} />
        <MovieOrder value={order} onChange={handleOrderChange} />
      </View>
    </View>
  );
};

export default MainFilter;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 30,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
  filterTitle: {
    fontSize: 16,
    color: colors.gray[500],
    fontFamily: DEFAULT_FONTS.SourceSans3Regular,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});
