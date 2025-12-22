import { colors } from '@theme/colors';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  title: string;
}

const AppButton: React.FC<Props> = ({
  title,
  activeOpacity = 0.7,
  style: containerStyle,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      {...props}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border_e3,
    backgroundColor: colors.primary_blue,
  },
});
