import Copyright from "./Copyright"
import Form from "./Form"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <img src="../logo.png" alt="Logo" className="logo" />

      <ul className="workouts">
        <Form />

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
  )
}
