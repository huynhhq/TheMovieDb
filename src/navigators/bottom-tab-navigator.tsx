import { screenOptionsTab } from './navigation-config';
import { BottomTabStackParamList } from 'root-stack-params';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from './custom-tab-bar';
import {HomeScreen, WatchListScreen } from '@containers';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName={'Home'}
      screenOptions={screenOptionsTab}
    >
      <Tab.Screen
        name={'Home'}
        options={{ tabBarLabel: 'Home' }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={'Watchlist'}
        options={{ tabBarLabel: 'Watchlist' }}
        component={WatchListScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
