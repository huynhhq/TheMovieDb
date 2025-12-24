import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { colors } from '@theme/colors';

const MovieDetailSkeleton: React.FC = () => {
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
    <View style={styles.container}>
      {/* Film Info Section */}
      <View style={styles.filmInfoSection}>
        <View style={styles.headerSection}>
          <Animated.View style={[styles.backButton, { opacity }]} />
          <View style={styles.titleArea}>
            <Animated.View style={[styles.titleLine, { opacity }]} />
            <Animated.View style={[styles.yearLine, { opacity }]} />
          </View>
          <Animated.View style={[styles.actionButton, { opacity }]} />
        </View>

        <View style={styles.detailSection}>
          <Animated.View style={[styles.posterImage, { opacity }]} />
          <View style={styles.infoArea}>
            <Animated.View style={[styles.infoLine, { opacity }]} />
            <Animated.View style={[styles.infoLine, { opacity, width: '80%' }]} />
            <Animated.View style={[styles.infoLine, { opacity, width: '90%' }]} />
            <Animated.View style={[styles.infoLine, { opacity, width: '70%' }]} />
          </View>
        </View>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewSection}>
        <View style={styles.scoreRow}>
          <View style={styles.scorePart}>
            <Animated.View style={[styles.scoreCircle, { opacity }]} />
            <Animated.View style={[styles.scoreLabel, { opacity }]} />
          </View>
          <View style={styles.creditsArea}>
            <View style={styles.creditItem}>
              <Animated.View style={[styles.creditName, { opacity }]} />
              <Animated.View style={[styles.creditRole, { opacity }]} />
            </View>
            <View style={[styles.creditItem, { marginTop: 12 }]}>
              <Animated.View style={[styles.creditName, { opacity }]} />
              <Animated.View style={[styles.creditRole, { opacity }]} />
            </View>
          </View>
        </View>

        {/* Tagline */}
        <Animated.View style={[styles.taglineLine, { opacity }]} />

        {/* Overview */}
        <View style={styles.overviewContent}>
          <Animated.View style={[styles.overviewTitle, { opacity }]} />
          <Animated.View style={[styles.contentLine, { opacity }]} />
          <Animated.View style={[styles.contentLine, { opacity, width: '90%' }]} />
          <Animated.View style={[styles.contentLine, { opacity, width: '95%' }]} />
          <Animated.View style={[styles.contentLine, { opacity, width: '70%' }]} />
        </View>

        {/* Bookmark Button */}
        <Animated.View style={[styles.bookmarkButton, { opacity }]} />
      </View>

      {/* Cast Section */}
      <View style={styles.castSection}>
        <Animated.View style={[styles.sectionTitle, { opacity }]} />
        <View style={styles.castList}>
          {[1, 2, 3].map(index => (
            <View key={index} style={styles.castCard}>
              <Animated.View style={[styles.castAvatar, { opacity }]} />
              <Animated.View style={[styles.castName, { opacity }]} />
              <Animated.View style={[styles.castCharacter, { opacity }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Recommendations Section */}
      <View style={styles.recommendationsSection}>
        <Animated.View style={[styles.sectionTitle, { opacity }]} />
        <View style={styles.recommendationsList}>
          {[1, 2].map(index => (
            <Animated.View
              key={index}
              style={[styles.recommendationCard, { opacity }]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default MovieDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filmInfoSection: {
    marginTop: 20,
    paddingTop: 16,
    backgroundColor: colors.header_blue,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[300],
  },
  titleArea: {
    flex: 1,
    paddingHorizontal: 12,
  },
  titleLine: {
    height: 24,
    backgroundColor: colors.gray[300],
    borderRadius: 4,
    marginBottom: 8,
  },
  yearLine: {
    height: 20,
    width: 80,
    backgroundColor: colors.gray[300],
    borderRadius: 4,
  },
  actionButton: {
    width: 50,
    height: 38,
    borderRadius: 4,
    backgroundColor: colors.gray[300],
  },
  detailSection: {
    gap: 20,
    padding: 30,
    flexDirection: 'row',
  },
  posterImage: {
    width: 112,
    height: 150,
    borderRadius: 5,
    backgroundColor: colors.gray[300],
  },
  infoArea: {
    flex: 1,
    gap: 8,
  },
  infoLine: {
    height: 16,
    backgroundColor: colors.gray[300],
    borderRadius: 4,
  },
  overviewSection: {
    backgroundColor: colors.primary_blue,
    padding: 30,
    gap: 24,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scorePart: {
    alignItems: 'center',
    gap: 12,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray[400],
  },
  scoreLabel: {
    width: 100,
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.gray[400],
  },
  creditsArea: {
    flex: 1,
    paddingLeft: 20,
  },
  creditItem: {
    gap: 6,
  },
  creditName: {
    height: 18,
    width: '70%',
    backgroundColor: colors.gray[400],
    borderRadius: 4,
  },
  creditRole: {
    height: 16,
    width: '50%',
    backgroundColor: colors.gray[400],
    borderRadius: 4,
  },
  taglineLine: {
    height: 20,
    width: '80%',
    backgroundColor: colors.gray[400],
    borderRadius: 4,
  },
  overviewContent: {
    gap: 12,
  },
  overviewTitle: {
    height: 24,
    width: 120,
    backgroundColor: colors.gray[400],
    borderRadius: 4,
    marginBottom: 8,
  },
  contentLine: {
    height: 16,
    width: '100%',
    backgroundColor: colors.gray[400],
    borderRadius: 4,
  },
  bookmarkButton: {
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.gray[400],
  },
  castSection: {
    gap: 20,
    marginTop: 50,
  },
  sectionTitle: {
    height: 22,
    width: 150,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    marginHorizontal: 30,
  },
  castList: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 30,
  },
  castCard: {
    width: 140,
    gap: 8,
  },
  castAvatar: {
    width: 140,
    height: 175,
    borderRadius: 8,
    backgroundColor: colors.gray[200],
  },
  castName: {
    height: 18,
    width: '80%',
    backgroundColor: colors.gray[200],
    borderRadius: 4,
  },
  castCharacter: {
    height: 16,
    width: '60%',
    backgroundColor: colors.gray[200],
    borderRadius: 4,
  },
  recommendationsSection: {
    gap: 20,
    marginTop: 60,
  },
  recommendationsList: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 16,
  },
  recommendationCard: {
    width: 300,
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.gray[200],
  },
});
