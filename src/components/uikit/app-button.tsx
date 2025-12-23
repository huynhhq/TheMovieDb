import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

// icons
import Loader from '@assets/icons/loader';

export type ButtonVariant = 'primary' | 'rounded';

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  title: string;
  loading?: boolean;
  type?: ButtonVariant;
  textStyle?: TextStyle;
}

const AppButton: React.FC<Props> = React.memo(
  ({
    title,
    testID,
    textStyle,
    type = 'primary',
    disabled = false,
    loading = false,
    activeOpacity = 0.7,
    style: containerStyle,
    onPress,
    ...props
  }) => {
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        testID={testID}
        style={[
          styles.container,
          containerStyle,
          type === 'rounded' && styles.roundedContainer,
          isDisabled && styles.disabledContainer,
        ]}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Loader width={20} height={20} color={colors.disabled_gray} />
        ) : (
          <Text
            style={[styles.text, textStyle, isDisabled && styles.disabledText]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

AppButton.displayName = 'AppButton';

export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border_e3,
    backgroundColor: colors.primary_blue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  roundedContainer: {
    borderRadius: 40,
  },
  disabledContainer: {
    borderWidth: 1,
    borderColor: colors.gray[100],
    backgroundColor: colors.gray[300],
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
  disabledText: {
    color: colors.disabled_text,
  },
});
