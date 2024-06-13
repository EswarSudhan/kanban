import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  exampleState: false,
  isLoading: false,
  error: ""
};

// Create the slice
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExampleState: (state, action) => {
      state.exampleState = !state.exampleState;
    },
    clearExampleState: (state) => {
      state.exampleState = "";
    }
  },
  extraReducers: (builder) => {
    // Add extra reducers if you have async thunks
  }
});

// Export the actions
export const { setExampleState, clearExampleState } = exampleSlice.actions;

// Export the reducer
export default exampleSlice.reducer;
