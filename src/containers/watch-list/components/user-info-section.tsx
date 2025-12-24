import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import { AppText, BackButton, Avatar } from '@components';

// hooks
import { useAuth } from '@hooks/use-auth';

// theme
import { colors } from '@theme/colors';
import { DEFAULT_FONTS } from '@theme/fonts';

const UserInfoSection: React.FC = () => {
  const { user } = useAuth();
  const finalName = user?.name || user?.username || '';

  return (
    <View style={styles.userInfoContainer}>
      <BackButton />
      <View style={styles.userTextContainer}>
        <Avatar name={finalName} />
        <View>
          <AppText style={styles.userInfoText}>{finalName}</AppText>
          <AppText style={styles.userInfoSubText}>
            Member since August 2023
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default UserInfoSection;

const styles = StyleSheet.create({
  userInfoContainer: {
    marginTop: 20,
    paddingTop: 14,
    paddingBottom: 40,
    paddingVertical: 10,
    backgroundColor: colors.dark_blue,
  },
  userTextContainer: {
    gap: 26,
    paddingTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  userInfoText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: DEFAULT_FONTS.SourceSans3SemiBold,
  },
  userInfoSubText: {
    fontSize: 16,
    color: '#FFFFFFB2',
    fontFamily: DEFAULT_FONTS.SourceSans3Regular,
  },
});
