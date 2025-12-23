import { useFilterMoviesSelector } from '../context';

export function useAdditionalFilterEffect() {
  const filterParams = useFilterMoviesSelector(state => state.params);

  return {
    status: filterParams?.status,
    sortBy: filterParams?.sort_by,
    isValid: filterParams?.isValid,
    searchQuery: filterParams?.search_query,
  };
}
