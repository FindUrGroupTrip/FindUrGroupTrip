import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Weather({ latitude, longitude }) {
  const [temperature, setTemperature] = useState(null)
  const [unit, setUnit] = useState(null)

  useEffect(() => {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const params = {
      latitude,
      longitude,
      current: 'temperature_2m,wind_speed_10m'
    };

    axios.get(url, { params })
      .then(({ data }) => {
        const { current_units, current } = data;
        setTemperature(current.temperature_2m);
        setUnit(current_units.temperature_2m);
      })
      .catch(error => {
        console.error('There was an error making the request:', error);
      });
  }, [latitude, longitude]);

  return (
    <>
      {temperature && <b>{temperature} {unit}</b>}
    </>
  );
}
