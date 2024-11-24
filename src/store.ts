import { configureStore } from '@reduxjs/toolkit'
import appStateSlice from './components/reducers/appStateSlice';
import sceneSlice from './components/reducers/sceneSlice'

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    scenes: sceneSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;