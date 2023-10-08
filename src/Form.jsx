import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"

import { useUrlPosition } from "./hooks/useUrlPosition"
import { addExercise } from "./features/exercise/exerciseSlice"
import { setShowForm } from "./features/app/appSlice"
import { useNavigate } from "react-router-dom"

export default function Form() {
  const [lat, lng] = useUrlPosition()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedExercise, setSelectedExercise] = useState("running")
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [cadence, setCadence] = useState("")
  const [elevation, setElevation] = useState("")
  const [cityName, setCityName] = useState("")

  const showForm = useSelector((state) => state.app.showForm)

  useEffect(
    function () {
      if (lat === null && lng === null) return

      async function fetchCityData() {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          )
          const data = await res.json()
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else."
            )
          setCityName(data.city || data.locality || "")
        } catch (err) {
          toast.error(err.message)
        }
      }
      fetchCityData()
    },
    [lat, lng]
  )

  useEffect(() => {
    function handleCloseForm(e) {
      if (e.keyCode === 27) {
        dispatch(setShowForm(false))
        navigate("/")
      }
    }

    document.addEventListener("keydown", handleCloseForm)

    return () => {
      document.removeEventListener("keydown", handleCloseForm)
    }
  }, [dispatch, navigate])

  function handleSubmit(e) {
    e.preventDefault()

    if (selectedExercise === "running" && !cadence) {
      toast.error("Please fill the form")
      return
    }

    if (selectedExercise === "cycling" && !elevation) {
      toast.error("Please fill the form")
      return
    }

    if (!distance || !duration) {
      toast.error("Please fill the form")
      return
    }

    const exerciseObj = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      coords: [lat, lng],
      type: selectedExercise,
      distance: Number(distance),
      duration: Number(duration),
      city: cityName,
      [selectedExercise === "cycling" ? "elevation" : "cadence"]: Number(
        selectedExercise === "cycling" ? elevation : cadence
      ),
    }

    dispatch(addExercise(exerciseObj))
    dispatch(setShowForm(false))
    toast.success("Exercise added")

    setDistance("")
    setDuration("")
    setCadence("")
    setElevation("")
    setSelectedExercise("running")
  }

  return (
    <form
      className={`form ${showForm ? "" : "hidden"}`}
      onSubmit={handleSubmit}
    >
      <div className="form__row">
        <label className="form__label">Type</label>
        <select
          className="form__input form__input--type"
          onChange={(e) => setSelectedExercise(e.target.value)}
          value={selectedExercise}
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>
      <div className="form__row">
        <label className="form__label">Distance</label>
        <input
          className="form__input form__input--distance"
          placeholder="km"
          onChange={(e) => setDistance(e.target.value)}
          value={distance}
          name="distance"
        />
      </div>
      <div className="form__row">
        <label className="form__label">Duration</label>
        <input
          className="form__input form__input--duration"
          placeholder="min"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          name="duration"
        />
      </div>
      <div
        className={`form__row ${
          selectedExercise === "running" ? "" : "form__row--hidden"
        }`}
      >
        <label className="form__label">Cadence</label>
        <input
          className="form__input form__input--cadence"
          placeholder="step/min"
          onChange={(e) => setCadence(e.target.value)}
          value={cadence}
          name="cadence"
        />
      </div>
      <div
        className={`form__row ${
          selectedExercise === "cycling" ? "" : "form__row--hidden"
        }`}
      >
        <label className="form__label">Elev Gain</label>
        <input
          className="form__input form__input--elevation"
          placeholder="meters"
          onChange={(e) => setElevation(e.target.value)}
          value={elevation}
          name="elevation"
        />
      </div>
      <div className="form__row form__row--city">
        <label className="form__label">City</label>
        <input
          className="form__input form__input--duration"
          placeholder="city"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          name="city"
        />
      </div>
    </form>
  )
}
