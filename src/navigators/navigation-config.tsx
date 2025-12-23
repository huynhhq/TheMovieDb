import DeviceInfo from "@helpers/device-info";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const screenOptionsStack: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: DeviceInfo.isAndroid ? 'none' : 'default',
  presentation: 'transparentModal',
};