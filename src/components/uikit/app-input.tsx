import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

interface Props extends React.ComponentProps<typeof TextInput> {
  testID?: string;
}
const AppInput: React.FC<Props> = ({ testID, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        testID={testID}
        placeholderTextColor={colors.gray[400]}
        {...props}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderColor: colors.border_e3,
    backgroundColor: colors.white,
    // shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
});
