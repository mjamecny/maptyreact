import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  run: [],
}

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {},
})

export default runSlice.reducer
