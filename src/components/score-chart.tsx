import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

// components
import { AppText } from '@components/uikit';
import Svg, { Circle } from 'react-native-svg';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

const ScoreChart: React.FC<Props> = ({
  percentage,
  size = 60,
  strokeWidth = 3.5,
  showLabel = true,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressValue = useMemo(() => {
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    return (clampedPercentage / 100) * circumference;
  }, [percentage, circumference]);

  const strokeDashoffset = circumference - progressValue;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={center} cy={center} r={center} fill="#042541" />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#D0D2D3"
          strokeOpacity={0.4}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.green}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>

      {showLabel && (
        <View style={styles.labelContainer}>
          <AppText style={styles.percentageText}>
            {Math.round(percentage)}
            <AppText style={styles.percentSymbol}>%</AppText>
          </AppText>
        </View>
      )}
    </View>
  );
};

export default ScoreChart;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: DEFAULT_FONTS.SourceSans3Bold,
  },
  percentSymbol: {
    fontSize: 6,
    color: colors.white,
    fontFamily: DEFAULT_FONTS.SourceSans3Regular,
  },
});
