import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const getCoords = createAsyncThunk("app/getCoords", async function () {
  const positionObj = await getPosition()
  return [positionObj.coords.latitude, positionObj.coords.longitude]
})

const initialState = {
  coords: null,
  showForm: false,
  isEditing: false,
  status: "idle",
  error: "",
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowForm: (state, action) => {
      state.showForm = action.payload
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCoords.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCoords.fulfilled, (state, action) => {
        state.coords = action.payload
        state.status = "idle"
      })
      .addCase(getCoords.rejected, (state) => {
        state.status = "error"
        state.error = "There was a problem getting your coordinates"
      }),
})
export const { setShowForm, setIsEditing } = appSlice.actions
export default appSlice.reducer
