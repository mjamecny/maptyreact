import { useSelector } from "react-redux"

import Form from "./Form"
import Workout from "./Workout"

import { getExercises } from "./features/app/exerciseSlice"

export default function Workouts() {
  const exercises = useSelector(getExercises)

  return (
    <ul className="workouts">
      <Form />
      {exercises.map((exercise) => (
        <Workout key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  )
}
