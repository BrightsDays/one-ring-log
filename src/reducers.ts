import { combineReducers } from "@reduxjs/toolkit"

type Action = {
  type: 'get' | 'clear'
}

const userState = {
  name: null
}

const userReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case 'get':
      return {
        ...state,
        name: 'email'
      }     
      break
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

export default rootReducer