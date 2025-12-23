import images from '@assets/images';
import { colors } from '@theme/colors';
import { Image, StyleSheet, View } from 'react-native';

const LogoHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={images.header_logo} />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    width: 80,
    height: 57,
  },
});
