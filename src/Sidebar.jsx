import { useDispatch, useSelector } from "react-redux"

import Copyright from "./Copyright"
import Form from "./Form"

import { getExercises, setExCoords } from "./features/app/exerciseSlice"

export default function Sidebar() {
  const exercises = useSelector(getExercises)
  const dispatch = useDispatch()

  function handleChangeCenter(coords) {
    dispatch(setExCoords(coords))
  }

  return (
    <div className="sidebar">
      <img src="../logo.png" alt="Logo" className="logo" />

      <ul className="workouts">
        <Form />
        {exercises.map((exercise) => {
          const { id, date, type, distance, duration, coords } = exercise
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]
          const newDate = new Date(date)
          const day = newDate.getDate()
          const month = months[newDate.getMonth()]

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
                  ? `Running on ${month} ${day}`
                  : `Cycling on ${month} ${day}`}
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
                <span className="workout__icon">
                  {type === "running" ? "🦶🏼" : "⛰"}
                </span>
                <span className="workout__value">
                  {type === "running" ? exercise.cadence : exercise.elevation}
                </span>
                <span className="workout__unit">
                  {type === "running" ? "spm" : "m"}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <Copyright />
    </div>
  )
}
