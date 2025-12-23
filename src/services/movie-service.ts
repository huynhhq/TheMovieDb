import { sharedApi } from './shared-service';

export const movieApi = sharedApi.injectEndpoints({
  endpoints: builder => ({
    getNowPlayingMovies: builder.query<
      GetNowPlayingMoviesResponse,
      IParams
    >({
      query: () => 'movie/now_playing?language=en-US&page=1',
    }),
  }),
});

export const { useGetNowPlayingMoviesQuery } = movieApi;
