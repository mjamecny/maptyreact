import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"

import Form from "./Form"
import Workout from "./Workout"
import SortBy from "./SortBy"
import Filter from "./Filter"

import { getExercises, removeAll } from "./features/exercise/exerciseSlice"
import { setIsEditing, setShowForm } from "./features/app/appSlice"

export default function Workouts({ mapRef }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const exercises = useSelector(getExercises)

  function handleRemoveAll() {
    toast((t) => (
      <span>
        Are you sure you want to delete all exercises?
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
              dispatch(setIsEditing(false))
              dispatch(setShowForm(false))
              dispatch(removeAll())
              toast.dismiss(t.id)
              toast.success("All exercises removed")
              navigate("/")
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
      <Form mapRef={mapRef} />
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
      {sortedExercises.length === 0 ? (
        <p className="no-exercises">
          There are no exercises. Add some with clicking on the map.
        </p>
      ) : (
        sortedExercises.map((exercise) => (
          <Workout key={exercise.id} exercise={exercise} />
        ))
      )}
    </ul>
  )
}
