import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, TMDB_READ_ACCESS_TOKEN, API_VERSION } from '@helpers/config';

const baseQueryWithAuth = () =>
  fetchBaseQuery({
    baseUrl: `${API_URL}/${API_VERSION}/`,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      headers.set('authorization', `Bearer ${TMDB_READ_ACCESS_TOKEN}`);
console.log('`${API_URL}/${API_VERSION}/` :>> ', `${API_URL}/${API_VERSION}/`);
      return headers;
    },
  });

export const sharedApi = createApi({
  tagTypes: [],
  reducerPath: 'sharedApi',
  baseQuery: baseQueryWithAuth(),
  endpoints: () => ({}),
});
