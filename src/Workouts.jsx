import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"

import Form from "./Form"
import Workout from "./Workout"
import SortBy from "./SortBy"
import Filter from "./Filter"

import { getExercises, removeAll } from "./features/exercise/exerciseSlice"

export default function Workouts() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const exercises = useSelector(getExercises)

  function handleRemoveAll() {
    dispatch(removeAll())
    toast.success("All exercises removed")
    navigate("/")
  }

  const arrToFilter = [...exercises]

  // FILTER
  const filterValue = searchParams.get("type") || "all"

  let filteredExercises

  if (filterValue === "all") {
    filteredExercises = arrToFilter
  }

  if (filterValue === "runnings") {
    filteredExercises = arrToFilter.filter(
      (exercise) => exercise.type === "running"
    )
  }
  if (filterValue === "cyclings") {
    filteredExercises = arrToFilter.filter(
      (exercise) => exercise.type === "cycling"
    )
  }

  // SORT
  const sortBy = searchParams.get("sortBy") || "date-dsc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1

  const sortedExercises = filteredExercises.sort((a, b) => {
    const fieldA = a[field]
    const fieldB = b[field]
    if (fieldA < fieldB) {
      return -1 * modifier
    }
    if (fieldA > fieldB) {
      return 1 * modifier
    }
    return 0
  })

  return (
    <ul className="workouts">
      <Form />
      {exercises.length > 0 && (
        <>
          <div className="action-container">
            <button className="btn btn--delete-all" onClick={handleRemoveAll}>
              Delete all
            </button>
            <SortBy />
          </div>
          <Filter filterField="type" />
        </>
      )}
      {sortedExercises.map((exercise) => (
        <Workout key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  )
}
