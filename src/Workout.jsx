import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FaTrash } from "react-icons/fa"

import { formatDate } from "./utils/helpers"
import { removeExercise } from "./features/exercise/exerciseSlice"
import toast from "react-hot-toast"

export default function Workout({ exercise }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, date, type, distance, duration, coords, city } = exercise
  const dateStr = formatDate(date)

  function handleChangeCenter(coords) {
    const [lat, lng] = coords
    navigate(`form?lat=${lat}&lng=${lng}`)
  }

  function handleRemove(id) {
    dispatch(removeExercise(id))

    toast.success("Exercise removed")
  }

  return (
    <li
      key={id}
      className={`workout ${
        type === "running" ? "workout--running" : "workout--cycling"
      }`}
      onClick={() => handleChangeCenter(coords)}
    >
      <h2 className="workout__title">
        {type === "running"
          ? `Running on ${dateStr}, ${city}`
          : `Cycling on ${dateStr}, ${city}`}
      </h2>
      <div className="workout__details">
        <span className="workout__icon">
          {type === "running" ? "🏃‍♂️" : "🚴‍♀️"}
        </span>
        <span className="workout__value">{distance}</span>
        <span className="workout__unit">km</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⏱</span>
        <span className="workout__value">{duration}</span>
        <span className="workout__unit">min</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⚡️</span>
        <span className="workout__value">
          {type === "running" ? exercise.pace : exercise.speed}
        </span>
        <span className="workout__unit">
          {type === "running" ? "min/km" : "km/h"}
        </span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">{type === "running" ? "🦶🏼" : "⛰"}</span>
        <span className="workout__value">
          {type === "running" ? exercise.cadence : exercise.elevation}
        </span>
        <span className="workout__unit">
          {type === "running" ? "spm" : "m"}
        </span>
      </div>
      <button className="btn-delete" onClick={() => handleRemove(id)}>
        <FaTrash />
      </button>
    </li>
  )
}
