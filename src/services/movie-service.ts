import { formatParamsSerializer } from '@helpers/formats';
import { sharedApi } from './shared-service';

export const movieApi = sharedApi.injectEndpoints({
  endpoints: builder => ({
    getNowPlayingMovies: builder.query<GetMovieListResponse, IParams>({
      query: ({status, ...params}) => {
        return {
          url: `movie/${status}`,
          params,
          paramsSerializer: formatParamsSerializer,
        };
      },
    }),
  }),
});

export const { useGetNowPlayingMoviesQuery } = movieApi;
