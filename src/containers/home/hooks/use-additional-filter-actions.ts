import { useCallback, useMemo, useState } from 'react';
import { useFilterMoviesCommit, useFilterMoviesSelector } from '../context';

export function useAdditionalFilterActions() {
  const commit = useFilterMoviesCommit();
  const filterParams = useFilterMoviesSelector(state => state.params);

  const [localStatus, setLocalStatus] = useState<string>(filterParams?.status || '');
  const [localSortBy, setLocalSortBy] = useState<string>(filterParams?.sort_by || '');
  const [localSearchQuery, setLocalSearchQuery] = useState<string>(filterParams?.search_query || '');

  const isValid = useMemo(() => {
    const statusChanged = localStatus !== (filterParams?.status || '');
    const sortByChanged = localSortBy !== (filterParams?.sort_by || '');
    const searchQueryChanged = localSearchQuery !== (filterParams?.search_query || '');
    
    return statusChanged || sortByChanged || searchQueryChanged;
  }, [localStatus, localSortBy, localSearchQuery, filterParams]);

  const handleStatusChange = useCallback(
    (status: string) => {
      setLocalStatus(status);
    },
    [],
  );

  const handleSortByChange = useCallback(
    (sort_by: string) => {
      setLocalSortBy(sort_by);
    },
    [],
  );

  const handleSearchQueryChange = useCallback(
    (search_query: string) => {
      setLocalSearchQuery(search_query);
    },
    [],
  );

  const handleSearch = useCallback(() => {
    commit(prev => ({
      params: {
        ...prev.params,
        status: localStatus,
        sort_by: localSortBy,
        search_query: localSearchQuery,
      },
    }));
  }, [commit, localStatus, localSortBy, localSearchQuery]);

  return {
    status: localStatus,
    sortBy: localSortBy,
    searchQuery: localSearchQuery,
    isValid,
    handleStatusChange,
    handleSortByChange,
    handleSearchQueryChange,
    handleSearch,
  };
}
