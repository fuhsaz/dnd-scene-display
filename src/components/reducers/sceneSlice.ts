import { createSlice } from "@reduxjs/toolkit";

interface SceneState {
  selectedSceneId: string;
}

const initialState: SceneState = {
  selectedSceneId: "",
};

export const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    setSelectedSceneId: (state, action) => {
      state.selectedSceneId = action.payload;
    },
  },
})

export const { setSelectedSceneId } = sceneSlice.actions;

export default sceneSlice.reducer;