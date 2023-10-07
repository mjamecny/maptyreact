import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"
import { setShowForm } from "./features/app/appSlice"
import { getExercises, getExCoords } from "./features/exercise/exerciseSlice"
import { useUrlPosition } from "./hooks/useUrlPosition"

export default function Map() {
  const exercises = useSelector(getExercises)
  const [exLat, exLng] = useSelector(getExCoords)
  const geoCords = useSelector((state) => state.app.coords)

  const [mapPosition, setMapPosition] = useState([40, 0])
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng]
  )

  useEffect(
    function () {
      if (geoCords) setMapPosition(geoCords)
    },
    [geoCords]
  )

  useEffect(
    function () {
      if (exLat && exLng) setMapPosition([exLat, exLng])
    },
    [exLat, exLng]
  )

  return (
    <MapContainer
      center={mapPosition}
      zoom={13}
      scrollWheelZoom={true}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {exercises.map((exercise) => {
        const { id, date, type, coords } = exercise
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]
        const newDate = new Date(date)
        const day = newDate.getDate()
        const month = months[newDate.getMonth()]

        return (
          <Marker key={id} position={coords}>
            <Popup className={`${type}-popup`}>
              <span>{`${
                type === "running"
                  ? `🏃‍♂️ Running on ${month} ${day}`
                  : `🚴‍♀️ Cycling on ${month} ${day}`
              }`}</span>
            </Popup>
          </Marker>
        )
      })}
      <ChangeCenter position={mapPosition} />
      <DetectClick />
    </MapContainer>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useMapEvents({
    click: (e) => {
      dispatch(setShowForm(true))
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
}
