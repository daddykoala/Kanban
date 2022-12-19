import { configureStore } from '@reduxjs/toolkit';
import TableauReducer from './reducer/tableauRducer';


export const store = configureStore({
  reducer: {
    tableau: TableauReducer,
  },
});
