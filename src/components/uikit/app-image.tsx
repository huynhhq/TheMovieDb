import React, { ComponentProps, useCallback, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// components
import FastImage from 'react-native-fast-image';

// assets
import images from '@assets/images';

// theme
import { colors } from '@theme/colors';

// hooks
import { useImageDimensions } from '@hooks';

interface IImageProps extends ComponentProps<typeof FastImage> {
  uri: string;
  defaultImg?: any;
  testID?: string;
}

const AppImage: React.FC<IImageProps> = React.memo(
  ({
    uri,
    style,
    testID,
    resizeMode = 'cover',
    defaultImg = images.no_img,
    ...rest
  }) => {
    const imageDimension = useImageDimensions({ uri });
    const [isError, setIsError] = useState<boolean>(false);

    const handleLoad = useCallback(() => {
      setIsError(false);
    }, []);

    const handleError = useCallback(() => {
      setIsError(true);
    }, []);

    if (imageDimension.loading) {
      return (
        <View style={[styles.defaultImg, style]} testID={testID}>
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="small" color={colors.disabled_gray} />
          </View>
        </View>
      );
    }

    if (imageDimension.error || isError) {
      return (
        <FastImage
          {...rest}
          testID={testID}
          style={style}
          source={defaultImg}
          resizeMode={resizeMode}
        />
      );
    }

    return (
      <FastImage
        {...rest}
        style={style}
        testID={testID}
        source={{ uri }}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  },
);

AppImage.displayName = 'AppImage';

export default AppImage;

const styles = StyleSheet.create({
  spinnerContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultImg: {
    backgroundColor: colors.gray[200],
  },
});
