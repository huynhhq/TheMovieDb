import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ChevronLeft } from '@assets/icons';
import { goBack } from '@helpers/navigation';

interface Props {
  callback?: () => void;
}
const BackButton: React.FC<Props> = ({ callback }) => {
  const handleOnPress = useCallback(() => {
    callback?.();
    goBack();
  }, [callback]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleOnPress}
      accessibilityLabel="Go back"
      accessibilityHint="Returns to the previous screen"
      accessibilityRole="button"
    >
      <ChevronLeft />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
