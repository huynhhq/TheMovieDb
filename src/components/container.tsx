import React, { ReactNode, useEffect } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StatusBar,
  StatusBarStyle,
  View,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

// theme
import { colors } from '@theme/colors';

// helpers
import DeviceInfo from '@helpers/device-info';

// components
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface ContainerProps extends Omit<ScrollViewProps, 'style'> {
  edges?: Edge[];
  testID?: string;
  style?: ViewStyle;
  children: ReactNode;
  useSafeArea?: boolean;
  scrollable?: boolean;
  statusBarColor?: string;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
}

const Container: React.FC<ContainerProps> = React.memo(({
  children,
  style,
  backgroundColor = colors.white,
  useSafeArea = true,
  scrollable = false,
  edges = ['top', 'bottom'] as Edge[],
  statusBarColor,
  statusBarStyle = 'dark-content',
  testID,
  // ScrollView props
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  ...scrollViewProps
}) => {
  useEffect(() => {
    if (DeviceInfo.isAndroid && statusBarColor) {
      StatusBar.setBackgroundColor(statusBarColor);
    }
    StatusBar.setBarStyle(statusBarStyle);
    if (DeviceInfo.isAndroid) {
      StatusBar.setTranslucent(true);
    }
  }, [statusBarColor, statusBarStyle]);

  const containerStyle = [styles.container, { backgroundColor }, style];

  const content = scrollable ? (
    <ScrollView
      testID={testID}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  if (useSafeArea) {
    return (
      <SafeAreaView testID={!scrollable ? testID : undefined} edges={edges} style={containerStyle}>
        {content}
      </SafeAreaView>
    );
  }

  return <View testID={!scrollable ? testID : undefined} style={containerStyle}>{content}</View>;
});

Container.displayName = 'Container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default Container;
