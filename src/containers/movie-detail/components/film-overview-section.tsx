import { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from '@states/store';
import { addToWatchlist, removeFromWatchlist } from '@states/slices/watchlist';

// components
import { AppText, ScoreChart } from '@components';

// theme
import { colors } from '@theme/colors';
import { Bookmark } from '@assets/icons';

interface Props {
  movie?: MovieDetail;
  credits?: MovieCredits;
}

const FilmOverviewSection: React.FC<Props> = ({ movie, credits }) => {
  const dispatch = useDispatch();
  const isInWatchlist = useSelector(
    state => !!movie && state.watchlist.movies.some(m => m.id === movie.id),
  );
  const handleWatchlistPress = useCallback(() => {
    if (!movie) return;
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  }, [dispatch, isInWatchlist, movie]);
  const director = credits?.crew.find(item => item.job === 'Director');
  const writer = credits?.crew.find(item => item.department === 'Writing');

  const directorJobs = credits?.crew
    .filter(item => item.id === director?.id)
    .map(item => item.job)
    .join(', ');

  const writerJobs = credits?.crew
    .filter(item => item.id === writer?.id)
    .map(item => item.job)
    .join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.scorePart}>
          <ScoreChart percentage={movie?.vote_average || 0} />
          <AppText fontSize={18} fontWeight="bold" color={colors.white}>
            User Score
          </AppText>
        </View>
        <View style={styles.creditsContainer}>
          {director && (
            <View style={styles.creditItem}>
              <AppText fontSize={18} fontWeight="semibold" color={colors.white}>
                {director.name}
              </AppText>
              <AppText fontSize={16} color={colors.white}>
                {directorJobs || 'Director'}
              </AppText>
            </View>
          )}
          {writer && writer.id !== director?.id && (
            <View style={styles.creditItem}>
              <AppText fontSize={18} fontWeight="semibold" color={colors.white}>
                {writer.name}
              </AppText>
              <AppText fontSize={16} color={colors.white}>
                {writerJobs || 'Writer'}
              </AppText>
            </View>
          )}
        </View>
      </View>
      {movie?.tagline && (
        <View>
          <AppText fontSize={20} italic color={colors.white}>
            {movie.tagline}
          </AppText>
        </View>
      )}
      <View style={styles.overviewPart}>
        <AppText fontSize={24} fontWeight="bold" color={colors.white}>
          Overview
        </AppText>
        <AppText fontSize={16} color={colors.white}>
          {movie?.overview || 'No overview available.'}
        </AppText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.bookmarkButton}
          accessibilityLabel={
            isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
          }
          accessibilityHint={
            isInWatchlist
              ? 'Removes this movie from your watchlist'
              : 'Adds this movie to your watchlist'
          }
          accessibilityRole="button"
          onPress={handleWatchlistPress}
        >
          <Bookmark />
          <AppText fontSize={18} fontWeight="semibold" color={colors.white}>
            {isInWatchlist ? 'Remove from Watchlist' : 'Add To Watchlist'}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(FilmOverviewSection);

const styles = StyleSheet.create({
  container: {
    gap: 34,
    padding: 30,
    backgroundColor: colors.primary_blue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scorePart: {
    gap: 8,
  },
  creditsContainer: {
    flex: 1,
    gap: 16,
    paddingLeft: 20,
  },
  creditItem: {
    gap: 4,
  },
  overviewPart: {
    gap: 10,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  bookmarkButton: {
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderColor: colors.white,
  },
});
