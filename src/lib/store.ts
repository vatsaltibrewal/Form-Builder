import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from './slices/formBuilderSlice';
import savedFormsReducer from './slices/savedFormsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      formBuilder: formBuilderReducer,
      savedForms: savedFormsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];