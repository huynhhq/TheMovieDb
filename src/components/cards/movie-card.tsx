import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

// components
import { AppImage, AppText } from '@components';

// theme
import { colors } from '@theme/colors';

// configs
import { TMDB_POSTER_FOLDER, TMDB_IMAGE_DOMAIN } from '@helpers/config';
import { Cancel } from '@assets/icons';

interface Props {
  item: Movie | MovieDetail;
  containerStyle?: ViewStyle;
  onRemove?: (id: number) => void;
  onViewDetail: (id: number) => void;
}

const HIT_SLOP = { top: 20, left: 20, right: 20, bottom: 20 };

const MovieCard: React.FC<Props> = ({ containerStyle, item, onViewDetail, onRemove }) => {

  const handleRemove = () => {
    onRemove?.(item.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, containerStyle]}
      onPress={() => onViewDetail(item.id)}
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

        {onRemove && (
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            activeOpacity={0.7}
            style={styles.removeButton}
            onPress={handleRemove}
          >
           <Cancel size={16} />
          </TouchableOpacity>
        )}
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
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
