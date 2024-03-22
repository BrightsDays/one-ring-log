import { PayloadAction } from "@reduxjs/toolkit"

const userState = {
  id: null,
  name: null
}

export const userReducer = (state = userState, action: PayloadAction<{email: string, id: string}>) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.email
      }
    case 'CLEAR_USER':
      return {
        ...state,
        id: null,
        name: null
      }
    default:
      return state
  }
}