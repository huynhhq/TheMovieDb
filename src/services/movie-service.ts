import { formatParamsSerializer } from '@helpers/formats';
import { sharedApi } from './shared-service';

export const movieApi = sharedApi.injectEndpoints({
  endpoints: builder => ({
    getMovies: builder.query<GetMovieListResponse, IParams>({
      query: ({ status, ...params }) => {
        return {
          url: `movie/${status}`,
          params,
          paramsSerializer: formatParamsSerializer,
        };
      },
    }),
    getMovieDetail: builder.query<MovieDetail, number>({
      query: id => ({
        url: `movie/${id}`,
      }),
    }),
    getMovieCredits: builder.query<MovieCredits, number>({
      query: id => ({
        url: `movie/${id}/credits`,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailQuery,
  useGetMovieCreditsQuery,
} = movieApi;
