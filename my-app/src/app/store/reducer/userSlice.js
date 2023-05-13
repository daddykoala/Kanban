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
    },
    removeTable: (state, action) => {
     
      const TableId = action.payload
      state.user.table = state.user.table.filter((table) => table.id !== TableId)
    }

  },
  
})

export const { setUser , addTable , removeTable } = userSlice.actions;

export default userSlice.reducer;