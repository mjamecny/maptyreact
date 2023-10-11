import { useRef, useState } from "react"
import Map from "./Map"
import Sidebar from "./Sidebar"

export default function AppLayout() {
  const mapRef = useRef()
  return (
    <>
      <Sidebar mapRef={mapRef} />
      <Map mapRef={mapRef} />
    </>
  )
}
