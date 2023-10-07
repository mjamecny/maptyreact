import { configureStore } from "@reduxjs/toolkit"

import appReducer from "./features/app/appSlice"
import exerciseReducer from "./features/app/exerciseSlice"

const store = configureStore({
  reducer: { app: appReducer, exercise: exerciseReducer },
})

export default store
