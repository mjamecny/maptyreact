import { useSearchParams } from "react-router-dom"

export default function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get("sortBy") || ""

  function handleChangeSort(e) {
    searchParams.set("sortBy", e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <select name="sort" id="sort" value={sortBy} onChange={handleChangeSort}>
      <option value="date-asc">Sort by date (ascending)</option>
      <option value="date-dsc">Sort by date (descending)</option>
      <option value="distance-asc">Sort by distance (ascending)</option>
      <option value="distance-dsc">Sort by distance (descending)</option>
      <option value="duration-asc">Sort by duration (ascending)</option>
      <option value="duration-dsc">Sort by duration (descending)</option>
    </select>
  )
}
