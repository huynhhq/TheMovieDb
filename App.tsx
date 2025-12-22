import React from 'react';

import { AppStore, persistor } from '@states/store';

import { Provider as ReduxProvider } from 'react-redux';
import { RootNavigator } from '@navigators/root-navigator';
import {PersistGate} from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <ReduxProvider store={AppStore}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
