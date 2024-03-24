import { useEffect, useState } from 'react'
import axios from 'axios'

const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast?latitude=48.866667&longitude=2.3333&current=temperature_2m,wind_speed_10m'


export default function Weather() {

  const [temperature, setTemperature] = useState(null)
  const [unit, setUnit] = useState(null)

  useEffect(() => {
    axios.get(WEATHER_BASE_URL)
      .then(({ data }) => {
        const { current_units, current } = data
        setTemperature(current.temperature_2m)
        setUnit(current_units.temperature_2m)
      })
  })

  return <>
    {
      temperature && <b>{temperature} {unit} </b>
    }
  </>
}