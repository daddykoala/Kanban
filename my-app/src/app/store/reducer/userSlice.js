import { createSlice } from '@reduxjs/toolkit'
import { getContentByUser } from '../api/api'

const initialState = {
  contentByUser: {},
  status: 'idle',
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContentByUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getContentByUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.contentByUser = action.payload
      })
      .addCase(getContentByUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})