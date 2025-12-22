import { logger } from '@helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  type Middleware,
  type MiddlewareAPI,
  configureStore,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import rootReducer, { type AppReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['movie'],
  stateReconciler: autoMergeLevel2,
};

const getHttpMethod = (action: any): string => {
  const method = action?.meta?.baseQueryMeta?.request?.method;
  if (method) {
    return method;
  }

  const type = action?.type || '';
  const isMutation = type.includes('executeMutation');

  return isMutation ? 'POST' : 'GET';
};

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => next => action => {
    // Log API calls on fulfilled to get accurate HTTP method from baseQueryMeta
    if (__DEV__ && (action as any).type?.endsWith('/fulfilled')) {
      const { meta } = action as any;
      if (meta?.arg) {
        const { endpointName, originalArgs } = meta.arg;
        const method = getHttpMethod(action);

        logger.debug('API Call:', {
          endpoint: endpointName,
          method: method,
          payload: originalArgs?.body || originalArgs?.params || originalArgs,
        });
      }
    }

    if (isRejectedWithValue(action)) {
      const { meta, payload } = action;
      const endpointName = (meta?.arg as any)?.endpointName || 'Unknown';
      const originalArgs = (meta?.arg as any)?.originalArgs;
      const method = getHttpMethod(action);

      logger.error('API Error: >>>', {
        endpoint: endpointName,
        method: method,
        status: (payload as any)?.status || 'Unknown',
        error: payload,
        originalArgs: originalArgs,
      });
    }

    return next(action);
  };

const persistedReducer = persistReducer<AppReducer>(persistConfig, rootReducer);

export const AppStore = configureStore({
  devTools: __DEV__,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
    }).concat(rtkQueryErrorLogger),
});

setupListeners(AppStore.dispatch);

export const persistor = persistStore(AppStore);

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
