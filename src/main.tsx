import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore, Tuple } from '@reduxjs/toolkit'
import rootReducer from './reducers/main.ts'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Journey } from './components/adventure/Journey.tsx'
import { Character } from './components/character/Character.tsx'


const router = createBrowserRouter([
  {
    path: "/one-ring-log/",
    element: <App />,
  },
  {
    path: "/one-ring-log/adventure/",
    element: <Journey />
  },
  {
    path: "/one-ring-log/character/",
    element: <Character />
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
