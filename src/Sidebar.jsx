import Copyright from "./Copyright"
import Logo from "./Logo"
import Workouts from "./Workouts"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Logo />
      <Workouts />
      <Copyright />
    </div>
  )
}
