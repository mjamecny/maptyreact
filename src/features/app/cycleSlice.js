import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cycle: [],
}

const cycleSlice = createSlice({
  name: "cycle",
  initialState,
  reducers: {
    addCycle: (state, action) => {
      state.cycle.push(action.payload)
    },
  },
})

export default cycleSlice.reducer
