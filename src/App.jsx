import { useEffect } from "react"
import { useDispatch } from "react-redux"

import Copyright from "./Copyright"

import { getCoords } from "./features/app/appSlice"

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCoords())
  }, [dispatch])

  return (
    <>
      <div className="sidebar">
        <img src="logo.png" alt="Logo" className="logo" />

        <ul className="workouts">
          <form className="form hidden">
            <div className="form__row">
              <label className="form__label">Type</label>
              <select className="form__input form__input--type">
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
              </select>
            </div>
            <div className="form__row">
              <label className="form__label">Distance</label>
              <input
                className="form__input form__input--distance"
                placeholder="km"
              />
            </div>
            <div className="form__row">
              <label className="form__label">Duration</label>
              <input
                className="form__input form__input--duration"
                placeholder="min"
              />
            </div>
            <div className="form__row">
              <label className="form__label">Cadence</label>
              <input
                className="form__input form__input--cadence"
                placeholder="step/min"
              />
            </div>
            <div className="form__row form__row--hidden">
              <label className="form__label">Elev Gain</label>
              <input
                className="form__input form__input--elevation"
                placeholder="meters"
              />
            </div>
            <button className="form__btn">OK</button>
          </form>

          <li className="workout workout--running">
            <h2 className="workout__title">Running on April 14</h2>
            <div className="workout__details">
              <span className="workout__icon">🏃‍♂️</span>
              <span className="workout__value">5.2</span>
              <span className="workout__unit">km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⏱</span>
              <span className="workout__value">24</span>
              <span className="workout__unit">min</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">4.6</span>
              <span className="workout__unit">min/km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">🦶🏼</span>
              <span className="workout__value">178</span>
              <span className="workout__unit">spm</span>
            </div>
          </li>

          <li className="workout workout--cycling">
            <h2 className="workout__title">Cycling on April 5</h2>
            <div className="workout__details">
              <span className="workout__icon">🚴‍♀️</span>
              <span className="workout__value">27</span>
              <span className="workout__unit">km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⏱</span>
              <span className="workout__value">95</span>
              <span className="workout__unit">min</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">16</span>
              <span className="workout__unit">km/h</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⛰</span>
              <span className="workout__value">223</span>
              <span className="workout__unit">m</span>
            </div>
          </li>
        </ul>

        <Copyright />
      </div>

      <div id="map"></div>
    </>
  )
}
