import { useSearchParams } from "react-router-dom"

export function useUrlId() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  return id
}
