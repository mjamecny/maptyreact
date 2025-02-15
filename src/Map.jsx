import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Popup,
  useMap,
  GeoJSON,
  FeatureGroup,
  useMapEvent,
} from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet/dist/leaflet.css"

import { getCoords, setGeoData, setShowForm } from "./features/app/appSlice"
import { getExerciseById } from "./features/exercise/exerciseSlice"
import { useUrlPosition } from "./hooks/useUrlPosition"
import { useUrlId } from "./hooks/useUrlId"
import { formatDate } from "./utils/helpers"

export default function Map({ mapRef }) {
  const dispatch = useDispatch()
  const popupRef = useRef(null)

  const exerciseId = useUrlId()
  const [mapLat, mapLng] = useUrlPosition()

  const exercise = useSelector((state) => getExerciseById(state, exerciseId))
  const { id, date, type, geoData, city, countryCode } = exercise || {}
  const { coords: geoCords, status } = useSelector((state) => state.app)

  const dateStr = formatDate(date)

  useEffect(
    function () {
      const popup = popupRef.current
      if (popup) {
        popup.openPopup()
      }
    },
    [popupRef.current]
  )

  useEffect(
    function () {
      if (!mapLat && !mapLng) return
      if (mapLat && mapLng) dispatch(geoCords)
    },
    [mapLat, mapLng, dispatch, geoCords]
  )

  return (
    <div className="map-container">
      <button
        className="btn btn--position"
        onClick={() => dispatch(getCoords())}
      >
        {status === "loading" ? "Loading..." : "Use your position"}
      </button>

      {geoCords && (
        <MapContainer
          center={geoCords}
          zoom={6}
          scrollWheelZoom={true}
          id="map"
        >
          <FeatureGroup ref={mapRef}>
            <EditControl
              position="topright"
              draw={{
                polyline: true,
                polygon: false,
                circle: false,
                rectangle: false,
                circlemarker: false,
                marker: false,
              }}
            />
          </FeatureGroup>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {exerciseId && (
            <GeoJSON
              ref={popupRef}
              key={id}
              data={geoData}
              style={{
                color: `${
                  type === "running"
                    ? "var(--color-brand--2)"
                    : "var(--color-brand--1)"
                }`,
                weight: 7,
              }}
            >
              <Popup className={`${type}-popup`}>
                <span>{`${
                  type === "running"
                    ? `🏃‍♂️ Running on ${dateStr}, ${city} (${countryCode})`
                    : `🚴‍♀️ Cycling on ${dateStr}, ${city} (${countryCode})`
                }`}</span>
              </Popup>
            </GeoJSON>
          )}
          <ChangeCenter position={geoCords} />
          <DetectDraw />
        </MapContainer>
      )}
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectDraw() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const map = useMapEvent("draw:created", (e) => {
    const coordinates = e.layer._latlngs.map((x) => {
      return [x.lng, x.lat]
    })

    const totalDistance = coordinates.reduce((acc, curPoint, i) => {
      if (i < coordinates.length - 1) {
        const distance = map.distance(curPoint, coordinates[i + 1])
        return acc + distance
      }
      return acc
    }, 0)

    const geoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates,
            type: "LineString",
          },
        },
      ],
    }

    dispatch(setGeoData(geoJSON))
    dispatch(setShowForm(true))
    navigate(
      `form?lat=${coordinates[0][1]}&lng=${coordinates[0][0]}&totalDistance=${totalDistance}`
    )
  })
  return null
}
