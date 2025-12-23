import { ComponentProps } from 'react';
import { Text } from 'react-native';

import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

type FontWeight =
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

interface ITextProps extends Omit<ComponentProps<typeof Text>, 'fontFamily'> {
  color?: string;
  italic?: boolean;
  fontSize?: number;
  fontWeight?: FontWeight;
}

const getFontFamily = (
  weight: FontWeight = 'normal',
  italic: boolean = false,
): string => {
  const fontMap: Record<FontWeight, { regular: string; italic: string }> = {
    extralight: {
      regular: DEFAULT_FONTS.SourceSans3ExtraLight,
      italic: DEFAULT_FONTS.SourceSans3ExtraLightItalic,
    },
    light: {
      regular: DEFAULT_FONTS.SourceSans3Light,
      italic: DEFAULT_FONTS.SourceSans3LightItalic,
    },
    normal: {
      regular: DEFAULT_FONTS.SourceSans3Regular,
      italic: DEFAULT_FONTS.SourceSans3Italic,
    },
    medium: {
      regular: DEFAULT_FONTS.SourceSans3Medium,
      italic: DEFAULT_FONTS.SourceSans3MediumItalic,
    },
    semibold: {
      regular: DEFAULT_FONTS.SourceSans3SemiBold,
      italic: DEFAULT_FONTS.SourceSans3SemiBoldItalic,
    },
    bold: {
      regular: DEFAULT_FONTS.SourceSans3Bold,
      italic: DEFAULT_FONTS.SourceSans3BoldItalic,
    },
    extrabold: {
      regular: DEFAULT_FONTS.SourceSans3ExtraBold,
      italic: DEFAULT_FONTS.SourceSans3ExtraBoldItalic,
    },
    black: {
      regular: DEFAULT_FONTS.SourceSans3Black,
      italic: DEFAULT_FONTS.SourceSans3BlackItalic,
    },
  };

  return italic ? fontMap[weight].italic : fontMap[weight].regular;
};

const AppText: React.FC<ITextProps> = ({
  style,
  fontSize = 14,
  italic = false,
  color = colors.black,
  fontWeight = 'normal',
  ...rest
}) => {
  const fontFamily = getFontFamily(fontWeight, italic);

  return <Text style={[{ color, fontSize, fontFamily }, style]} {...rest} />;
};

export default AppText;
