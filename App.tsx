import React from 'react';
import { StyleSheet } from 'react-native';

import { AppStore, persistor } from '@states/store';
import { RootNavigator } from '@navigators/root-navigator';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '@contexts';
import { Provider as ReduxProvider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ReduxProvider store={AppStore}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <RootNavigator />
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </AuthProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
