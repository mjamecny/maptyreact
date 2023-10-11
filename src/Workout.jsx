import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FaTrash, FaPen } from "react-icons/fa"
import toast from "react-hot-toast"

import { formatDate } from "./utils/helpers"
import { removeExercise } from "./features/exercise/exerciseSlice"
import { setIsEditing, setShowForm } from "./features/app/appSlice"

export default function Workout({ exercise }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, date, type, distance, duration, coords, city, countryCode } =
    exercise
  const dateStr = formatDate(date)

  function handleChangeCenter(coords) {
    const [lat, lng] = coords
    dispatch(setShowForm(false))
    navigate(`form?lat=${lat}&lng=${lng}&id=${id}`)
  }

  function handleRemove(id) {
    toast((t) => (
      <span>
        Are you sure you want to delete this exercise?
        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            className="btn-confirm btn-confirm--yes"
            onClick={() => {
              toast.dismiss(t.id)
              dispatch(removeExercise(id))
              dispatch(setShowForm(false))
              navigate("/")
              toast.success("Exercise removed")
            }}
          >
            Yes
          </button>
          <button
            className="btn-confirm btn-confirm--no"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ))
  }

  function handleEdit(e, id) {
    e.stopPropagation()
    dispatch(setShowForm(true))
    dispatch(setIsEditing(true))
    navigate(`form?id=${id}&lat=${coords[0]}&lng=${coords[1]}`)
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
          ? `Running on ${dateStr}, ${city} (${countryCode})`
          : `Cycling on ${dateStr}, ${city} (${countryCode})`}
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
      <div className="buttons-container">
        <button className="btn-delete" onClick={() => handleRemove(id)}>
          <FaTrash />
        </button>
        <button className="btn-edit" onClick={(e) => handleEdit(e, id)}>
          <FaPen />
        </button>
      </div>
    </li>
  )
}
