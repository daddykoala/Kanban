import { configureStore } from '@reduxjs/toolkit';
import TableauReducer from './reducer/tableauRducer';
import { userApi } from './api/api';


export const store = configureStore({
  reducer: {
    tableau: TableauReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})
;
