import { StyleSheet, View } from 'react-native';
import { AppImage, AppText } from './uikit';
import { colors } from '@theme/colors';
import { useMemo } from 'react';

interface Props {
  name: string;
  uri?: string;
}
const Avatar: React.FC<Props> = ({ name, uri }) => {
  const initials = name
    ?.split(' ')
    .map(i => i[0])
    .join('')
    .slice(0, 2);

  const renderImageComp = useMemo(() => {
    if (uri) {
      return <AppImage style={styles.avatar} uri={uri} />;
    }

    return (
      <View style={styles.textContainer}>
        <AppText style={styles.text}>{initials}</AppText>
      </View>
    );
  }, [uri, initials]);

  return <View style={styles.container}>{renderImageComp}</View>;
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
});
