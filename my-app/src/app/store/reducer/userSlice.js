import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser: (state, action) => {
      
      state.user = action.payload
      
    },

    addTable: (state, action) => {
      state.user.table.push(action.payload)
    }

  },
  
})

export const { setUser , addTable } = userSlice.actions;

export default userSlice.reducer;