import { useSearchParams } from "react-router-dom"

const options = [
  { value: "all", label: "All" },
  { value: "runnings", label: "Runnings" },
  { value: "cyclings", label: "Cyclings" },
]

export default function Filter({ filterField }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFilter = searchParams.get(filterField) || options.at(0).value

  function handleClick(value) {
    searchParams.set(filterField, value)
    setSearchParams(searchParams)
  }
  return (
    <div className="filter">
      {options.map((option) => (
        <button
          className={`btn btn-filter ${
            currentFilter === option.value ? "btn-filter--active" : ""
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
