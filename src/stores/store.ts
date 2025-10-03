import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch } from 'react-redux';

import commonReducer from './common/common.slice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
