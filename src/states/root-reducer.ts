import { type Action, type Reducer, combineReducers } from '@reduxjs/toolkit';
import { reducer as movieReducer } from './slices/movie';

export type AppReducer = ReturnType<typeof combinedReducer>;
export const combinedReducer = combineReducers({
  movie: movieReducer,
});

const rootReducer: Reducer<AppReducer> = (
  state: AppReducer | undefined,
  action: Action,
) => {
  return combinedReducer(state, action);
};

export default rootReducer;
