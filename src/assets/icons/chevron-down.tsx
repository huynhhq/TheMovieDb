import React from 'react';
import { colors } from '@theme/colors';
import Svg, { Path } from 'react-native-svg';
const ChevronDown: React.FC<ISvgIconProps> = ({
  size = 24,
  strokeWidth = 2,
  color = colors.black,
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
      <Path d="m6 9 6 6 6-6" />
    </Svg>
  );
};

export default ChevronDown;
