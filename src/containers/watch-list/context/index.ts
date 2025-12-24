import { IFilterMoviesState, IFilterParams } from '../types';
import { createFastContext } from '@helpers/create-fast-context';

const initialFilterParams: IFilterParams = {
  sort_by: 'vote_average.desc',
  order: 'desc',
} as const;

const initialFilterMoviesState: IFilterMoviesState = {
  params: initialFilterParams,
};

export const {
  Provider: FilterWatchlistProvider,
  useCommit: useFilterWatchlistCommit,
  useSelector: useFilterWatchlistSelector,
  createSelector: createFilterWatchlistSelector,
} = createFastContext(initialFilterMoviesState);
