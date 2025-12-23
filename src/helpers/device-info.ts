import { Platform } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export default class DeviceInfo {
  static insets: EdgeInsets = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  static isIos = Platform.OS === 'ios';
  static isAndroid = Platform.OS === 'android';
}
