import baseApi from './base.api';

export const counterApi = baseApi
  .enhanceEndpoints({
    // Important if you want to implement revalidation.
    // You can also specify this tagType on base.api.ts if
    // you want to revalidate 'counter' from other apis
    addTagTypes: ['Counter'],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      getCounterValue: builder.query<{ value: number }, void>({
        providesTags: ['Counter'],
        query: () => ({
          url: '/counter',
        }),
      }),
      setCounter: builder.mutation<{ value: number }, { value: number }>({
        invalidatesTags: ['Counter'],
        query: ({ value }) => ({
          method: 'POST',
          url: '/counter',
          body: { value: +value },
        }),
      }),
    }),
  });

export const { useGetCounterValueQuery, useSetCounterMutation } = counterApi;
