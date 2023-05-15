import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './api/api';
import {userSlice} from './reducer/userSlice';



export const store = configureStore({
  reducer: {

    [userApi.reducerPath]: userApi.reducer,
    user: userSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})
;
