import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import Form from "./Form"
import Workout from "./Workout"

import { getExercises, removeAll } from "./features/exercise/exerciseSlice"

export default function Workouts() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const exercises = useSelector(getExercises)

  function handleRemoveAll() {
    dispatch(removeAll())
    toast.success("All exercises removed")
    navigate("/")
  }

  return (
    <ul className="workouts">
      <Form />
      {exercises.length > 0 && (
        <button className="btn btn--delete-all" onClick={handleRemoveAll}>
          Delete all
        </button>
      )}
      {exercises.map((exercise) => (
        <Workout key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  )
}
