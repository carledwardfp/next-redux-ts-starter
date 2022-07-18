import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 0;

const counterSlice = createSlice({
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
});

const { actions, reducer } = counterSlice;
export const { setCounter, incrementCounter, decrementCounter } = actions;
export default reducer;
