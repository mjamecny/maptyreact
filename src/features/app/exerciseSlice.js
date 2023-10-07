import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  exercises: [],
  exCoords: [],
}

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push(action.payload)
    },
    setExCoords: (state, action) => {
      state.exCoords = action.payload
    },
  },
})

export const getExercises = (state) => state.exercise.exercises
export const getExCoords = (state) => state.exercise.exCoords

export const { addExercise, setExCoords } = exerciseSlice.actions
export default exerciseSlice.reducer
