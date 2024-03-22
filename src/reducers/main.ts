import { combineReducers } from "@reduxjs/toolkit"
import { userReducer } from "./userReducer"
import { loadingReducer } from "./loadingReducer"

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer