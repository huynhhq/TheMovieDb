import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// components
import { AppImage, AppText } from '@components/uikit';

// helpers
import { windowWidth } from '@helpers/sizes';
import { TMDB_BACKDROP_FOLDER, TMDB_IMAGE_DOMAIN } from '@helpers/config';

interface Props {
  item: Movie;
}

const RecommendationCard: React.FC<Props> = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <AppImage
        style={styles.backdrop}
        uri={`${TMDB_IMAGE_DOMAIN}${TMDB_BACKDROP_FOLDER}${item.backdrop_path}`}
      />
      <View style={styles.content}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.title}>{`${item?.vote_average?.toFixed(1)}%`}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendationCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.7,
    overflow: 'hidden',
  },
  backdrop: {
    borderRadius: 5,
    width: '100%',
    height: 162,
  },
  content: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },
});
