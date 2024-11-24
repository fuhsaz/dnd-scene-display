import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isControlVisible: boolean;
}

const initialState: AppState = {
  isControlVisible: false,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setControlVisibility(state, action: PayloadAction<boolean>) {
      state.isControlVisible = action.payload;
    },
  },
});

export const { setControlVisibility } = appStateSlice.actions;

export default appStateSlice.reducer;