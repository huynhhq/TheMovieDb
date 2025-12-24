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
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Animated.View style={[styles.backButton, { opacity }]} />
        <View style={styles.titleArea}>
          <Animated.View style={[styles.titleLine, { opacity }]} />
          <Animated.View style={[styles.yearLine, { opacity }]} />
        </View>
        <Animated.View style={[styles.actionButton, { opacity }]} />
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
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Animated.View style={[styles.contentLine, { opacity }]} />
        <Animated.View style={[styles.contentLine, { opacity, width: '90%' }]} />
        <Animated.View style={[styles.contentLine, { opacity, width: '95%' }]} />
        <Animated.View style={[styles.contentLine, { opacity, width: '70%' }]} />
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
  headerSection: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#0399C2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
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
  overviewSection: {
    backgroundColor: colors.primary_blue,
    padding: 30,
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
  contentSection: {
    padding: 30,
    gap: 12,
  },
  contentLine: {
    height: 16,
    width: '100%',
    backgroundColor: colors.gray[200],
    borderRadius: 4,
  },
});
