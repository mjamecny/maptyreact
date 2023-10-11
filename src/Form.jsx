import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { useNavigate, useSearchParams } from "react-router-dom"

import { useUrlPosition } from "./hooks/useUrlPosition"
import { addExercise, getExercises } from "./features/exercise/exerciseSlice"
import { setIsEditing, setShowForm } from "./features/app/appSlice"

export default function Form({ mapRef }) {
  const [lat, lng, totalDistance] = useUrlPosition()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedExercise, setSelectedExercise] = useState("running")
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [cadence, setCadence] = useState("")
  const [elevation, setElevation] = useState("")
  const [cityName, setCityName] = useState("")
  const [countryCode, setCountryCode] = useState("")

  const { showForm, isEditing, geoData } = useSelector((state) => state.app)
  const exercises = useSelector(getExercises)
  const [searchParams] = useSearchParams()
  const editedId = searchParams.get("id")
  const editedLat = searchParams.get("lat")
  const editedLng = searchParams.get("lng")

  useEffect(
    function () {
      if (!isEditing) return
      const editedExercise = exercises.find(
        (exercise) => exercise.id === editedId
      )
      setSelectedExercise(editedExercise.type)
      setDistance(editedExercise.distance)
      setDuration(editedExercise.duration)
      setCityName(editedExercise.city)
      setCountryCode(editedExercise.countryCode)
      editedExercise.type === "running"
        ? setCadence(editedExercise.cadence)
        : setElevation(editedExercise.elevation)
    },
    [exercises, isEditing, editedId]
  )

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
          setCountryCode(data.countryCode)
        } catch (err) {
          toast.error(err.message)
        }
      }
      fetchCityData()
      if (!isEditing) {
        setDistance((totalDistance / 1000).toFixed(2))
      }
    },
    [lat, lng, totalDistance, isEditing]
  )

  useEffect(() => {
    function handleCloseForm(e) {
      if (e.keyCode === 27) {
        dispatch(setShowForm(false))
        dispatch(setIsEditing(false))
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
      id: isEditing ? editedId : crypto.randomUUID(),
      date: new Date().toISOString(),
      coords: isEditing ? [lat, lng] : [editedLat, editedLng],
      geoData,
      type: selectedExercise,
      distance: Number(distance),
      duration: Number(duration),
      city: cityName,
      countryCode,
      [selectedExercise === "cycling" ? "elevation" : "cadence"]: Number(
        selectedExercise === "cycling" ? elevation : cadence
      ),
    }

    dispatch(addExercise(exerciseObj))
    dispatch(setShowForm(false))
    setDistance("")
    setDuration("")
    setCadence("")
    setElevation("")
    setSelectedExercise("running")
    isEditing
      ? toast.success("Exercise edited")
      : toast.success("Exercise added")
    dispatch(setIsEditing(false))
    navigate(
      `form?id=${exerciseObj.id}&lat=${exerciseObj.coords[0]}&lng=${exerciseObj.coords[1]}`
    )

    const layerKey = Object.keys(mapRef.current._layers)[0]
    mapRef.current.removeLayer(mapRef.current._layers[layerKey])
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
          disabled={isEditing}
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
          disabled={isEditing}
        />
      </div>
      <button className="form__btn">OK</button>
    </form>
  )
}
