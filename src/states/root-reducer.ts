import { type Action, type Reducer, combineReducers } from '@reduxjs/toolkit';
import movieReducer from './slices/movie';
import watchlistReducer from './slices/watchlist';
import { sharedApi } from '@services/shared-service';

export type AppReducer = ReturnType<typeof combinedReducer>;
export const combinedReducer = combineReducers({
  movie: movieReducer,
  watchlist: watchlistReducer,
  [sharedApi.reducerPath]: sharedApi.reducer,
});

const rootReducer: Reducer<AppReducer> = (
  state: AppReducer | undefined,
  action: Action,
) => {
  return combinedReducer(state, action);
};

export default rootReducer;
