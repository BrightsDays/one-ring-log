import { PayloadAction } from "@reduxjs/toolkit"

const loadingState = {
  log: false,
  players: false,
  animals: false,
  items: false,
  character: false
}

export const loadingReducer = (state = loadingState, action: PayloadAction) => {
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
    case 'CHARACTER_LOADED':
      return {
        ...state,
        character: true
      }
    case 'RESET_LOADING':
      return {
        ...state,
        log: false,
        players: false,
        animals: false,
        items: false,
        character: false
      }
    default:
      return state
  }
}

export const isLoading = (state = loadingState) => {
  return state.log && state.players && state.animals && state.items
}