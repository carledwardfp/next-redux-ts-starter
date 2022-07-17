// import slices here
import { counterSlice } from './reducers';

// export actions here
export const { setCounter, incrementCounter, decrementCounter } = counterSlice.actions;
