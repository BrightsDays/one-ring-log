import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore, Tuple } from '@reduxjs/toolkit'
import rootReducer from './reducers.ts'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Journey } from './components/journey/Journey.tsx'

const router = createBrowserRouter([
  {
    path: "/one-ring-log/",
    element: <App />,
  },
  {
    path: "/one-ring-log/adventures/:id",
    element: <Journey />
  }
])

const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple()
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
