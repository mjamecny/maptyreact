import { configureStore } from "@reduxjs/toolkit"

import appReducer from "./features/app/appSlice"
import runReducer from "./features/app/runSlice"
import cycleReducer from "./features/app/cycleSlice"

const store = configureStore({
  reducer: { app: appReducer, run: runReducer, cycle: cycleReducer },
})

export default store
