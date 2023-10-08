import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

function calcPace(distance, duration) {
  return (duration / distance).toFixed(2)
}

function calcSpeed(distance, duration) {
  return (distance / (duration / 60)).toFixed(2)
}

export const addExercise = createAsyncThunk(
  "exercise/addExercise",
  async (exercise) => {
    const { distance, duration, type } = exercise
    type === "running"
      ? (exercise.pace = calcPace(distance, duration))
      : (exercise.speed = calcSpeed(distance, duration))
    return exercise
  }
)

const initialState = {
  exercises: JSON.parse(localStorage.getItem("exercises")) || [],
}

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    removeExercise(state, action) {
      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExercise.fulfilled, (state, action) => {
      state.exercises.push(action.payload)
    })
  },
})

export const saveExercisesToLocalStorage = (state) => (next) => (action) => {
  const result = next(action)

  const exercises = state.getState().exercise.exercises
  localStorage.setItem("exercises", JSON.stringify(exercises))

  return result
}

export const getExercises = (state) => state.exercise.exercises

export const { removeExercise } = exerciseSlice.actions
export default exerciseSlice.reducer
