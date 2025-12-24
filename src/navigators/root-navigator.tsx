import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParamList } from 'root-stack-params';
import { setTopLevelNavigator } from '@helpers/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeviceInfo from '@helpers/device-info';
import TabNavigator from './bottom-tab-navigator';
import { screenOptionsStack } from './navigation-config';
import MovieDetailScreen from '@containers/movie-detail';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const insets = useSafeAreaInsets();
  DeviceInfo.setDeviceInset(insets);

  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setTopLevelNavigator(navigationRef.current);
      }}
    >
      <RootStack.Navigator screenOptions={screenOptionsStack}>
        <RootStack.Screen name={'Tabs'} component={TabNavigator} />
        <RootStack.Screen
          name={'MovieDetail'}
          component={MovieDetailScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
