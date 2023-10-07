import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cycle: [],
}

const cycleSlice = createSlice({
  name: "cycle",
  initialState,
  reducers: {},
})

export default cycleSlice.reducer
