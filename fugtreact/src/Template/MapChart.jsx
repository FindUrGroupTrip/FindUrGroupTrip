import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import allAdresse from 'leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

export const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  const response = await fetch(url)
  const data = await response.json()
  if (data && data.length > 0) {
    return [data[0].lat, data[0].lon] // Retourne la latitude et la longitude de la première correspondance
  }
  return null
}

const MapChart = ({ address }) => {
  const [markerPosition, setMarkerPosition] = useState()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    geocodeAddress(address).then(coords => {
      setMarkerPosition(coords)
    }).catch(reason => {
      console.log(reason)
    })
  }, [address])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed  text-white w-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2">
        <FontAwesomeIcon icon={faMap} />
      </button>
      {isOpen && <MapContainer center={[46.71109, 2.4191036]}
                               zoom={5.4}
                               style={{
                                 maxWidth: '20rem',
                                 width: '100%',
                                 position: 'fixed',
                                 top: '13rem',
                                 bottom: 0,
                                 right: 0,
                               }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{address}</Popup>
          </Marker>
        )}
      </MapContainer>}
    </div>
  )
}

export default MapChart

