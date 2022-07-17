import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import hydrateAction from './hydrateAction';

const initialState = 0;

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCounter(_state, action: PayloadAction<number>) {
      return action.payload;
    },
    incrementCounter(state) {
      return state + 1;
    },
    decrementCounter(state) {
      return state - 1;
    },
  },
  // for now, always add extraReducers builder addCase for hydrateAction
  // if you can find a way to add this to store.ts, please add a PR (Pull Request)
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (_state, action) => {
      return action.payload.counter;
    });
  },
});
