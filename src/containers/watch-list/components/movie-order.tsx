import React, { useRef, useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';

// components
import { AppText } from '@components';

// assets
import { Upwards } from '@assets/icons';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

const ANIMATION_DURATION = 300;
const HIT_SLOP = { top: 20, left: 20, right: 20, bottom: 20 };

interface Props {
  value: string;
  onChange: (value: string) => void;
}
const MovieOrder: React.FC<Props> = ({ value, onChange }) => {
  const rotateAnim = useRef(
    new Animated.Value(value === 'desc' ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: value === 'desc' ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [value, rotateAnim]);

  const handleToggleOrder = () => {
    const newOrder = value === 'asc' ? 'desc' : 'asc';
    onChange(newOrder);
  };

  const iconRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const iconStyle = useMemo(
    () => ({
      transform: [{ rotate: iconRotation }],
    }),
    [iconRotation],
  );

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>Order:</AppText>
      <TouchableOpacity
        hitSlop={HIT_SLOP}
        activeOpacity={0.7}
        onPress={handleToggleOrder}
      >
        <Animated.View style={iconStyle}>
          <Upwards />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieOrder;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: colors.gray[500],
    fontFamily: DEFAULT_FONTS.SourceSans3Regular,
  },
});
