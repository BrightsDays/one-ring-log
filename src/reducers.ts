import { PayloadAction, combineReducers } from "@reduxjs/toolkit"

const userState = {
  name: null
}

const userReducer = (state = userState, action: PayloadAction<string>) => {
  switch (action.type) {
    case 'get':
      return {
        ...state,
        name: action.payload
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