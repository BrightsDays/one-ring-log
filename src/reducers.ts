import { PayloadAction, combineReducers } from "@reduxjs/toolkit"

const userState = {
  id: null,
  name: null
}

const userReducer = (state = userState, action: PayloadAction<{email: string, id: string}>) => {
  switch (action.type) {
    case 'get':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.email
      }
    case 'clear':
      return {
        ...state,
        name: null
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer
})

export type IRootState = ReturnType<typeof rootReducer>
export default rootReducer