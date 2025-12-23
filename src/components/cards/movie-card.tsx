import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

// components
import { AppImage, AppText } from '@components';

// theme
import { colors } from '@theme/colors';

// configs
import { TMDB_POSTER_FOLDER, TMDB_IMAGE_DOMAIN } from '@helpers/config';

interface Props {
  item: Movie;
  containerStyle?: ViewStyle;
}

const MovieCard: React.FC<Props> = ({ containerStyle, item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, containerStyle]}
    >
      <AppImage
        style={styles.thumbnail}
        uri={`${TMDB_IMAGE_DOMAIN}${TMDB_POSTER_FOLDER}${item.poster_path}`}
      />
      <View style={styles.content}>
        <View>
          <AppText fontSize={16} fontWeight="semibold">
            {item.title}
          </AppText>
          <AppText color={colors.gray[400]}>{item.release_date}</AppText>
        </View>
        <AppText numberOfLines={2}>{item.overview}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    marginHorizontal: 30,
    backgroundColor: colors.white,
    borderColor: colors.border_e3,
    // shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  thumbnail: {
    width: 96,
    height: '100%',
  },
  content: {
    gap: 10,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
});
