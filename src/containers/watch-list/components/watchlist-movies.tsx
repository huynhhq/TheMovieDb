import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

// components
import { AppText } from '@components/uikit';
import { MovieCard } from '@components/cards';

// states
import { useSelector } from 'react-redux';
import { removeFromWatchlist } from '@states/slices';
import { RootState, useDispatch } from '@states/store';

// helpers
import { goScreen } from '@helpers/navigation';

const WatchlistMovies: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.watchlist.movies);

  const onViewDetail = useCallback((id: number) => {
    goScreen('MovieDetail', { id });
  }, []);

  const removeMovie = useCallback(
    (id: number) => {
      dispatch(removeFromWatchlist(id));
    },
    [dispatch],
  );

  if (!movies.length) {
    return (
      <View style={styles.emptyContainer}>
        <AppText fontSize={18}>Your watchlist is empty.</AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <MovieCard
          item={item}
          onViewDetail={onViewDetail}
          onRemove={removeMovie}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  movieItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listContent: {
    gap: 20,
    paddingBottom: 16,
  },
});

export default WatchlistMovies;
