import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  run: [],
}

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {
    addRun: (state, action) => {
      state.run.push(action.payload)
    },
  },
})

export default runSlice.reducer
