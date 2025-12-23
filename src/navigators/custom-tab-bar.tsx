import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@theme/colors';
import { Bookmark, Home } from '@assets/icons';

interface TabIconProps {
  routeName: string;
  isFocused: boolean;
}

const TabIcon: React.FC<TabIconProps> = React.memo(({ routeName, isFocused }) => {
  const iconColor = isFocused ? colors.primary_blue : colors.white;

  switch (routeName) {
    case 'Home':
      return <Home color={iconColor} />;
    case 'Watchlist':
      return <Bookmark color={iconColor} />;
    default:
      return <Home color={iconColor} />;
  }
});

const CustomTabBar: React.FC<BottomTabBarProps> = React.memo(({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            android_ripple={{ color: 'transparent' }}
            href={buildHref(route.name, route.params)}
            style={styles.btnTab}
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <TabIcon routeName={route.name} isFocused={isFocused} />
          </PlatformPressable>
        );
      })}
    </View>
  );
});

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.gray[200],
    backgroundColor: colors.secondary_blue,
  },
  btnTab: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
