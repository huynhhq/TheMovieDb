import React from 'react';
import { colors } from '@theme/colors';
import Svg, { Path } from 'react-native-svg';

const Home: React.FC<ISvgIconProps> = ({
  size = 24,
  strokeWidth = 2,
  color = colors.white,
}) => {
  return (
    <Svg
      fill="none"
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <Path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Svg>
  );
};

export default Home;
