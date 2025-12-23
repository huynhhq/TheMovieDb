import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParamList } from 'root-stack-params';
import { setTopLevelNavigator } from '@helpers/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@containers';
import { screenOptionsStack } from './navigation-config';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setTopLevelNavigator(navigationRef.current);
      }}
    >
      <RootStack.Navigator
        initialRouteName={'Home'}
        screenOptions={screenOptionsStack}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
