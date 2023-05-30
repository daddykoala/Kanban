import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import {authSlice} from '../app/store/reducer/authSlice'
import {sidebarSlice} from '../app/store/reducer/sidebarSlice'
import {userSlice} from '../app/store/reducer/userSlice'

export function renderWithProviders(
  ui,
  {preloadedState = {}, 
  store = configureStore({ reducer: { auth: authSlice.reducer,
    sidebar:sidebarSlice.reducer,user: userSlice.reducer},
  preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}