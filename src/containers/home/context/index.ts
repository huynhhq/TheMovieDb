import { IFilterMoviesState, IFilterParams } from '../types';
import { createFastContext } from '@helpers/create-fast-context';

const initialFilterParams: IFilterParams = {
  page: 1,
  search_query: '',
  sort_by: 'title.asc',
  status: 'now_playing',
  isValid: false,
} as const;

const initialFilterMoviesState: IFilterMoviesState = {
  params: initialFilterParams,
};

export const {
  Provider: FilterMoviesProvider,
  useCommit: useFilterMoviesCommit,
  useSelector: useFilterMoviesSelector,
  createSelector: createFilterMoviesSelector,
} = createFastContext(initialFilterMoviesState);
