import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// libraries
import moment from 'moment';

// components
import { AppImage, AppText, BackButton } from '@components';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

// helpers
import { convertedToHoursAndMinutes } from '@helpers/date-helper';
import { TMDB_IMAGE_DOMAIN, TMDB_POSTER_FOLDER } from '@helpers/config';

interface Props {
  movie?: MovieDetail;
}

const FilmInfoSection: React.FC<Props> = ({ movie }) => {
  const releaseYear = movie?.release_date
    ? moment(movie.release_date).format('YYYY')
    : '';
  const language = movie?.original_language?.toUpperCase() || 'N/A';
  const runtime = movie?.runtime
    ? convertedToHoursAndMinutes(movie.runtime, { isShort: true })
    : 'N/A';
  const genres =
    movie?.genres && movie.genres.length > 0
      ? movie.genres.map(item => item.name).join(', ')
      : 'N/A';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <View style={styles.titleContainer}>
          <AppText style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {movie?.title || 'Unknown Title'}
            {releaseYear && (
              <AppText style={styles.year}> ({releaseYear})</AppText>
            )}
          </AppText>
        </View>
        <View style={styles.button} />
      </View>

      <View style={styles.detailContainer}>
        <AppImage
          style={styles.thumbnail}
          uri={`${TMDB_IMAGE_DOMAIN}${TMDB_POSTER_FOLDER}${movie?.poster_path || ''}`}
        />
        <View style={styles.infoContainer}>
          <AppText fontSize={16} color={colors.white}>
            {movie?.release_date || 'N/A'}
            {` (${language}) ● ${runtime}`}
          </AppText>
          <AppText fontSize={16} color={colors.white}>
            {genres}
          </AppText>
          <AppText fontSize={16} color={colors.white}>
            <AppText fontSize={16} color={colors.white} fontWeight={'semibold'}>
              Status:{' '}
            </AppText>
            {movie?.status || 'N/A'}
          </AppText>
          <AppText fontSize={16} color={colors.white}>
            <AppText fontSize={16} color={colors.white} fontWeight={'semibold'}>
              Original Language:{' '}
            </AppText>
            {language}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default memo(FilmInfoSection);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 16,
    backgroundColor: colors.header_blue,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  button: {
    width: 50,
    height: 38,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    color: colors.white,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
  year: {
    fontSize: 20,
    lineHeight: 26,
    color: colors.white,
    fontFamily: DEFAULT_FONTS.SourceSans3Regular,
  },
  thumbnail: {
    width: 112,
    height: 150,
    borderRadius: 5,
  },
  detailContainer: {
    gap: 20,
    padding: 30,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    gap: 8,
  },
});
