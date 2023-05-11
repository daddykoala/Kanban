import { configureStore } from '@reduxjs/toolkit';
import TableauReducer from './reducer/tableauRducer';
import { userApi } from './api/api';
import {userSlice} from './reducer/userSlice';


export const store = configureStore({
  reducer: {
    tableau: TableauReducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})
;
