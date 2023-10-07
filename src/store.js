import { configureStore } from "@reduxjs/toolkit"

import appReducer from "./features/app/appSlice"
import exerciseReducer, {
  saveExercisesToLocalStorage,
} from "./features/exercise/exerciseSlice"

const store = configureStore({
  reducer: { app: appReducer, exercise: exerciseReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveExercisesToLocalStorage),
})

export default store
