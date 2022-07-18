import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const baseQuery = fetchBaseQuery({
  // You can change this to `/api` if you're using Next.js api endpoints
  // Or any other api endpoints
  baseUrl: 'http://localhost:3000/',
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  // Uncomment next line if you have an endpoint for refreshing tokens
  // Example:
  // if (
  //   result.error &&
  //   result.error.status === 401 &&
  //   (typeof args === 'string' || (typeof args !== 'string' && args.url !== '/auth/refresh'))
  // ) {
  //   // try to get a new token
  //   const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
  //   if (refreshResult.data) {
  //     api.dispatch(setUser(refreshResult.data as User));
  //     // retry the initial query
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(setUser(null));
  //   }
  // }
  return result;
};

// initialize an base api service that we'll inject endpoints into later as needed
const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [],
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export default baseApi;
