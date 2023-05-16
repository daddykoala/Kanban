import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './api/api';
import {userSlice} from './reducer/userSlice';
import {authSlice} from './reducer/authSlice';



export const store = configureStore({
  reducer: {

    [userApi.reducerPath]: userApi.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})
;
