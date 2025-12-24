import { sharedApi } from './shared-service';

export const accountApi = sharedApi.injectEndpoints({
  endpoints: builder => ({
    getAccountDetails: builder.query({
      query: (accountId) => ({
        url: `account/${accountId}`,
      }),
    }),
  }),
});

export const { useGetAccountDetailsQuery } = accountApi;
