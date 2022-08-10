import { configureStore } from '@reduxjs/toolkit';
import gameFieldReducer from '../features/gameField/gameFieldSlice';

export const store = configureStore({
  reducer: {
    gameField: gameFieldReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
