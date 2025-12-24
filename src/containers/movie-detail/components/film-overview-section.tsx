import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.bookmarkButton}
        accessibilityLabel="Add to watchlist"
        accessibilityHint="Adds this movie to your watchlist"
        accessibilityRole="button"
      >
        <Bookmark />
        <AppText fontSize={18} fontWeight="semibold" color={colors.white}>
          Add To Watchlist
        </AppText>
      </TouchableOpacity>
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
  bookmarkButton: {
    gap: 10,
    width: 200,
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
