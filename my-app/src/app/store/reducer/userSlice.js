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
      console.log("je passe par userclice");
      state.user = action.payload
      console.log("je passe par userclice", state.user);
    }

  },
  
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;