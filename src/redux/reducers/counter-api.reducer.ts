import { createSlice } from '@reduxjs/toolkit';
import { counterApi } from '../apis';
import hydrateAction from './hydrateAction';

type CounterState = {
  loading: boolean;
  value: number;
  error: string;
};

const initialState: CounterState = {
  loading: true,
  value: 0,
  error: '',
};

export const counterApiSlice = createSlice({
  name: 'counterFromServer',
  initialState,
  reducers: {},
  // for now, always add extraReducers builder addCase for hydrateAction
  // if you can find a way to add this to store.ts, please add a PR (Pull Request)
  extraReducers: (builder) => {
    builder
      .addCase(hydrateAction, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      // you can also add matchers
      // this matcher gets called when getCounterValue is pending
      .addMatcher(counterApi.endpoints.getCounterValue.matchPending, (state) => {
        return {
          ...state,
          loading: true,
          error: '',
        };
      })
      .addMatcher(counterApi.endpoints.getCounterValue.matchFulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          value: action.payload.value,
          error: '',
        };
      })
      .addMatcher(counterApi.endpoints.getCounterValue.matchRejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error:
            action.error.message?.toLowerCase() !== 'rejected'
              ? action.error.message || ''
              : 'Make sure you run `yarn serve:mock',
        };
      })
      .addMatcher(counterApi.endpoints.setCounter.matchPending, (state) => {
        return {
          ...state,
          loading: true,
          error: '',
        };
      })
      .addMatcher(counterApi.endpoints.setCounter.matchFulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          value: action.payload.value,
          error: '',
        };
      })
      .addMatcher(counterApi.endpoints.setCounter.matchRejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error:
            action.error.message?.toLowerCase() !== 'rejected'
              ? action.error.message || ''
              : 'Make sure you run `yarn serve:mock',
        };
      });
  },
});
