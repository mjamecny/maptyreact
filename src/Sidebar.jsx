import Copyright from "./Copyright"
import Logo from "./Logo"
import Workouts from "./Workouts"

export default function Sidebar({ mapRef }) {
  return (
    <div className="sidebar">
      <Logo />
      <Workouts mapRef={mapRef} />
      <Copyright />
    </div>
  )
}
