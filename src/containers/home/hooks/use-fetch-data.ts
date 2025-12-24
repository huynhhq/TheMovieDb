import { useCallback, useEffect, useMemo, useState } from 'react';

// services
import { useGetMoviesQuery } from '@services/movie-service';

// context
import { useFilterMoviesCommit, useFilterMoviesSelector } from '../context';

export const useFetchData = () => {
  const commit = useFilterMoviesCommit();
  const { page, status } = useFilterMoviesSelector(state => state.params);
  const { data, isLoading, isFetching, refetch } = useGetMoviesQuery({
    page,
    status,
  });

  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);

  const loading = useMemo(
    () => isLoading || isFetching,
    [isLoading, isFetching],
  );

  useEffect(() => {
    if (!isFetching && data?.results) {
      setDisplayedMovies(prev => {
        if (page === 1) {
          return data.results;
        }
        return [...prev, ...data.results];
      });
    }
  }, [data, isFetching, page]);

  const onRefresh = useCallback(() => {
    commit(prev => ({
      params: {
        ...prev.params,
        page: 1,
      },
    }));
    setDisplayedMovies([]);
    refetch();
  }, [commit, refetch]);

  useEffect(() => {
    onRefresh();
  }, [status, onRefresh]);

  const loadMore = useCallback(() => {
    if (!isFetching && data?.total_pages && page < data.total_pages) {
      commit(prev => ({
        params: {
          ...prev.params,
          page: prev.params.page + 1,
        },
      }));
    }
  }, [isFetching, data?.total_pages, page, commit]);

  return {
    loading,
    result: displayedMovies,
    loadMore,
    onRefresh,
  };
};
