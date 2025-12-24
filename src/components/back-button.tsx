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
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handleOnPress}>
      <ChevronLeft />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
