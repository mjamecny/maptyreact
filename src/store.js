import { configureStore } from "@reduxjs/toolkit"

import appReducer, { getCoords } from "./features/app/appSlice"
import exerciseReducer, {
  saveExercisesToLocalStorage,
} from "./features/exercise/exerciseSlice"

const store = configureStore({
  reducer: { app: appReducer, exercise: exerciseReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveExercisesToLocalStorage),
})

store.dispatch(getCoords())

export default store
