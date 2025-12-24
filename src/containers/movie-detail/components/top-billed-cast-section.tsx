import { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@components/uikit';
import { CastInfoCard } from '@components/cards';
import { colors } from '@theme/colors';

interface Props {
  casts?: Cast[];
}

const CAST_CARD_WIDTH = 140;
const CAST_CARD_GAP = 16;

const TopBilledCastSection: React.FC<Props> = ({ casts = [] }) => {
  const renderItem = useCallback(
    ({ item }: { item: Cast }) => <CastInfoCard cast={item} />,
    [],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CAST_CARD_WIDTH,
      offset: (CAST_CARD_WIDTH + CAST_CARD_GAP) * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback((item: Cast) => item.id.toString(), []);

  if (!casts || casts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText fontSize={22} fontWeight="semibold">
            Top Billed Cast
          </AppText>
        </View>
        <View style={styles.emptyContainer}>
          <AppText fontSize={16} color={colors.gray[500]}>
            No cast information available.
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText fontSize={22} fontWeight="semibold">
          Top Billed Cast
        </AppText>
      </View>
      <FlatList
        horizontal
        data={casts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        windowSize={5}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default memo(TopBilledCastSection);

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 50,
  },
  header: {
    paddingHorizontal: 30,
  },
  listContainer: {
    gap: 16,
    paddingHorizontal: 30,
  },
  emptyContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
  },
});
