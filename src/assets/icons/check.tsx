import * as React from 'react';
import { colors } from '@theme/colors';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

const Check: React.FC<Props> = ({
  width = 24,
  height = 24,
  strokeWidth = 2,
  color = colors.white,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Check;
