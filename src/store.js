import { configureStore } from "@reduxjs/toolkit"

import appReducer from "./features/app/appSlice"
import exerciseReducer, {
  saveExercisesToLocalStorage,
} from "./features/app/exerciseSlice"

const store = configureStore({
  reducer: { app: appReducer, exercise: exerciseReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveExercisesToLocalStorage),
})

export default store
