import React, { memo, useCallback, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Animated } from 'react-native';

// services
import { useGetRecommendationsQuery } from '@services/movie-service';

// components
import { AppText, RecommendationCard } from '@components';

// helpers
import { windowWidth } from '@helpers/sizes';

// theme
import { DEFAULT_FONTS } from '@theme/fonts';
import { colors } from '@theme/colors';

interface Props {
  id: number;
}

const CARD_WIDTH = windowWidth * 0.7;
const CARD_GAP = 20;
const ITEM_SIZE = CARD_WIDTH + CARD_GAP;

const RecommendationSkeleton: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.skeletonContainer}>
      {[1, 2].map(index => (
        <Animated.View
          key={index}
          style={[styles.skeletonCard, { opacity }]}
        />
      ))}
    </View>
  );
};

const Recommendations: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isFetching } = useGetRecommendationsQuery(id, {
    skip: !id,
  });

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <RecommendationCard item={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: Movie, index: number) => `${item.id || index}`,
    [],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    [],
  );

  const loading = isLoading || isFetching;
  const recommendations = data?.results || [];
  const hasRecommendations = recommendations.length > 0;

  return (
    <View style={styles.container}>
      <AppText style={styles.headerTitle}>Recommendations</AppText>
      <View>
        {loading ? (
          <RecommendationSkeleton />
        ) : !hasRecommendations ? (
          <View style={styles.emptyContainer}>
            <AppText fontSize={16} color={colors.gray[500]}>
              No recommendations available.
            </AppText>
          </View>
        ) : (
          <FlatList
            horizontal
            data={recommendations}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            snapToAlignment="start"
            decelerationRate="fast"
            initialNumToRender={2}
            maxToRenderPerBatch={3}
            windowSize={3}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            snapToInterval={ITEM_SIZE}
          />
        )}
      </View>
    </View>
  );
};

export default memo(Recommendations);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: windowWidth * 0.8,
  },
  listContent: {
    gap: 20,
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 22,
    marginBottom: 24,
    paddingHorizontal: 30,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
  loadingContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  skeletonContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 16,
  },
  skeletonCard: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.gray[200],
  },
});
