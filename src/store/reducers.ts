import { PayloadAction, combineReducers } from "@reduxjs/toolkit"

const userState = {
  id: null,
  name: null
}

const loadingState = {
  log: false,
  players: false,
  animals: false,
  items: false
}

const userReducer = (state = userState, action: PayloadAction<{email: string, id: string}>) => {
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

const loadingReducer = (state = loadingState, action: PayloadAction) => {
  switch (action.type) {
    case 'LOG_LOADED':
      return {
        ...state,
        log: true
      }
    case 'PLAYERS_LOADED':
      return {
        ...state,
        players: true
      }
    case 'ANIMALS_LOADED':
      return {
        ...state,
        animals: true
      }
    case 'ITEMS_LOADED':
      return {
        ...state,
        items: true
      }
    case 'RESET_LOADING':
      return {
        ...state,
        log: true,
        players: true,
        animals: true,
        items: true
      }
    default:
      return state
  }
}

export const isLoading = (state = loadingState) => {
  return state.log && state.players && state.animals && state.items
}

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer