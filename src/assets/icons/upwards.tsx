import React from 'react';
import { colors } from '@theme/colors';
import Svg, { Path } from 'react-native-svg';
const Upwards: React.FC<ISvgIconProps> = ({
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
      <Path d="M8 6L12 2L16 6" />
      <Path d="M12 2V22" />
    </Svg>
  );
};

export default Upwards;
