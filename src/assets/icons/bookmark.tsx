import React from 'react';
import { colors } from '@theme/colors';
import Svg, { Path } from 'react-native-svg';

const Bookmark: React.FC<ISvgIconProps> = ({
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
      <Path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </Svg>
  );
};

export default Bookmark;
