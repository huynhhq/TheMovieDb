import { type Action, type Reducer, combineReducers } from '@reduxjs/toolkit';
import { reducer as movieReducer } from './slices/movie';
import { sharedApi } from '@services/shared-service';

export type AppReducer = ReturnType<typeof combinedReducer>;
export const combinedReducer = combineReducers({
  movie: movieReducer,
  [sharedApi.reducerPath]: sharedApi.reducer,
});

const rootReducer: Reducer<AppReducer> = (
  state: AppReducer | undefined,
  action: Action,
) => {
  return combinedReducer(state, action);
};

export default rootReducer;
