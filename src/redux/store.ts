import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { baseApi } from './apis';
import { counterApiSlice, counterSlice } from './reducers';

const reducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [counterSlice.name]: counterSlice.reducer,
  [counterApiSlice.name]: counterApiSlice.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // add middlewares here
    }).concat(baseApi.middleware),
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  // debug: process.env.NODE_ENV === 'development',
});
