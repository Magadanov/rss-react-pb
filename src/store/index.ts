import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from './reducer/form';
import { useDispatch, useSelector } from 'react-redux';

export const appStore = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
