import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import ScoreChart from '@components/score-chart';
import { AppText } from '@components/uikit';
import { colors } from '@theme/colors';

interface Props {
  movie?: MovieDetail;
  credits?: MovieCredits;
}

const FilmOverviewSection: React.FC<Props> = ({ movie, credits }) => {
  const director = credits?.crew.find(item => item.job === 'Director');
  const writer = credits?.crew.find(item => item.department === 'Writing');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.scorePart}>
          <ScoreChart percentage={movie?.vote_average || 0} />
          <AppText fontSize={18} fontWeight="bold" color={colors.white}>
            User Score
          </AppText>
        </View>
        <View>
          <View>
            <AppText fontSize={18} fontWeight="semibold" color={colors.white}>
              {director?.name}
            </AppText>
            <AppText fontSize={16} color={colors.white}>
              Director, Writer
            </AppText>
          </View>
          <View>
            <AppText fontSize={18} fontWeight="semibold" color={colors.white}>
              {writer?.name}
            </AppText>
            <AppText fontSize={16} color={colors.white}>
              Director, Writer
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(FilmOverviewSection);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary_blue,
    padding: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scorePart: {
    gap: 8,
  },
});
