import React from 'react';
import { colors } from '@theme/colors';
import Svg, { Path } from 'react-native-svg';
const Upwards: React.FC<ISvgIconProps> = ({
  width = 10,
  height = 15,
  color = colors.black,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 15" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.88413 0.295652L9.61713 3.51739C10.1159 3.94783 10.1159 4.63043 9.61713 5.06087C9.11839 5.46957 8.30227 5.46957 7.82872 5.06087L6.2267 3.72174V13.9087C6.2267 14.4783 5.67254 14.9957 4.99244 14.9957C4.31234 14.9957 3.733 14.4739 3.733 13.9087V3.72174L2.15617 5.06087C1.65743 5.46957 0.866499 5.46957 0.367758 5.06087C0.130982 4.83478 0 4.58261 0 4.31304C0 4.01739 0.130982 3.74783 0.367758 3.51739L4.09572 0.295652C4.2267 0.182609 4.33249 0.113043 4.51889 0.0695652C4.67506 0.026087 4.80605 0 4.99244 0C5.33501 0 5.64736 0.0913044 5.88413 0.295652Z"
        fill={color}
      />
    </Svg>
  );
};

export default Upwards;
