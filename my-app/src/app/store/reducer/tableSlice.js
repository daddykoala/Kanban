import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  table: null,
  status: 'idle',
  error: null,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {

    setTable: (state, action) => {
      
      state.table = action.payload
      
    },

  },
  
})

export const { setTable } = tableSlice.actions;

export default tableSlice.reducer;