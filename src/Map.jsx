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
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

import { getCoords, setShowForm } from "./features/app/appSlice"
import { getExercises } from "./features/exercise/exerciseSlice"
import { useUrlPosition } from "./hooks/useUrlPosition"
import { formatDate } from "./utils/helpers"

export default function Map() {
  const exercises = useSelector(getExercises)
  const { coords: geoCords, status } = useSelector((state) => state.app)

  const [mapPosition, setMapPosition] = useState([40, 0])
  const [mapLat, mapLng] = useUrlPosition()
  const dispatch = useDispatch()

  useEffect(
    function () {
      if (!mapLat && !mapLng) return
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng]
  )

  useEffect(() => {
    if (!geoCords) return
    if (geoCords) setMapPosition(geoCords)
  }, [geoCords])

  return (
    <div className="map-container">
      {!geoCords && (
        <button
          className="btn btn--position"
          onClick={() => dispatch(getCoords())}
        >
          {status === "loading" ? "Loading..." : "Use your position"}
        </button>
      )}
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
          const { id, date, type, coords, city } = exercise
          const dateStr = formatDate(date)

          return (
            <Marker
              key={id}
              position={coords}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup className={`${type}-popup`}>
                <span>{`${
                  type === "running"
                    ? `🏃‍♂️ Running on ${dateStr}, ${city}`
                    : `🚴‍♀️ Cycling on ${dateStr}, ${city}`
                }`}</span>
              </Popup>
            </Marker>
          )
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position, undefined, { animate: true, duration: 0.5 })
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
