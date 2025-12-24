import React from 'react';
import { colors } from '@theme/colors';
import Svg, { Path } from 'react-native-svg';
const ChevronLeft: React.FC<ISvgIconProps> = ({
  width = 32,
  height = 38,
  color = colors.white,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 38" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3237 10L10 19L19.3237 28L21.321 26.0673L13.9994 19L21.321 11.9327L19.3237 10Z"
        fill={color}
      />
    </Svg>
  );
};

export default ChevronLeft;
