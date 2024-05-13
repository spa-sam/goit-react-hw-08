import { createSlice } from "@reduxjs/toolkit";

const storageSlice = createSlice({
  name: "storage",
  initialState: {
    shouldClear: false,
  },
  reducers: {
    clearStorage: (state) => {
      state.shouldClear = true;
    },
    storageCleared: (state) => {
      state.shouldClear = false;
    },
  },
});

export const { clearStorage, storageCleared } = storageSlice.actions;
export default storageSlice.reducer;
