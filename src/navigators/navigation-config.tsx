import DeviceInfo from '@helpers/device-info';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const screenOptionsStack: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: DeviceInfo.isAndroid ? 'none' : 'default',
  presentation: 'transparentModal',
};

export const screenOptionsTab: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
  animation: DeviceInfo.isAndroid ? 'none' : 'shift',
};
