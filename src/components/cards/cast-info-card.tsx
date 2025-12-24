import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage, AppText } from '@components/uikit';

import { colors } from '@theme/colors';
import { TMDB_CAST_FOLDER, TMDB_IMAGE_DOMAIN } from '@helpers/config';

interface Props {
  cast: Cast;
}
const CastInfoCard: React.FC<Props> = ({ cast }) => {
  return (
    <View style={styles.container}>
      <AppImage
        style={styles.avatar}
        uri={`${TMDB_IMAGE_DOMAIN}${TMDB_CAST_FOLDER}${cast.profile_path}`}
      />
      <View style={styles.content}>
        <AppText fontSize={18} fontWeight="bold" numberOfLines={2}>
          {cast.name}
        </AppText>
        <AppText numberOfLines={2} fontSize={16}>{cast.character}</AppText>
      </View>
    </View>
  );
};

export default CastInfoCard;

const styles = StyleSheet.create({
  container: {
    width: 140,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: colors.border_e3,
    backgroundColor: colors.white,
    // shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 140,
    height: 154,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
