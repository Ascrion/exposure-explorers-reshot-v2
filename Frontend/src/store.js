///  store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create a slice (includes reducer + actions)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; //action.payload is the data sent when performing the action
    }
  }
});

// Step 2: Export actions and reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions; //actions usable in other components
export const counterReducer = counterSlice.reducer;

// Step 3: Create the store
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;
