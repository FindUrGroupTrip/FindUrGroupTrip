import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../Template/ImageComponent';
import ActivitiesFilterComponent from '../Template/ActivitiesFilterComponent';
import axios from 'axios';
import MapChart, { geocodeAddress } from '../Template/MapChart'
import Weather from '../Template/Weather'

export function Activitelist() {
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({ nom: '', lieu: '', date: '' });

  const fetchActivities = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/activites', { params: filters });
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filters]);
  const handleFilterChange = (e) => {
    setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Trier les activités en activités à venir et activités passées
  const pastActivities = activities.filter(activity => new Date(activity.date) < new Date());
  const upcomingActivities = activities.filter(activity => new Date(activity.date) >= new Date());

  const ActivityCard = ({ activity, handleMouseEnter }) => {
    const [coords, setCoords] = useState(null)

    useEffect(() => {
      geocodeAddress(activity.lieu).then(_coords => {
        const [lat, log] = _coords;
        setCoords({
          lat,
          log
        })
      }).catch(reason => {
        console.log('error', reason);
      })
    }, [])
    return <>
      <Link to={`/activites/${activity.id}`} key={activity.id} className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300">
        <div onMouseEnter={(e) => handleMouseEnter(activity.lieu)} className="p-4 bg-white rounded-md shadow-md max-w-md mx-auto">
          <div className="text-center">
            {activity.image_path ? (
              <div className="w-full h-40 overflow-hidden flex items-center justify-center mb-4">
                <img
                  src={`http://localhost:8000${activity.image_path}`}
                  alt={activity.nom}
                  className="object-cover max-w-full max-h-full rounded-md"
                />
              </div>
            ) : (
              <ImageComponent style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            )}
            <h3 className="text-lg font-semibold mb-2">{activity.nom}</h3>
            <p className="text-gray-600">{activity.lieu}</p>
            <p className="text-gray-700">{activity.description}</p>
            <p className="text-gray-500">{activity.date}</p>
            <StarRating rating={activity.average_rating} />
            <p className="text-yellow-600 text-sm mt-2">{`Nombre de notes : ${activity.number_of_notes} `}</p>

            {
              !!coords ? <Weather latitude={coords.lat} longitude={coords.log}></Weather> : '.. C'
            }
          </div>
        </div>
      </Link>
    </>
  }

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500 star">&#9733;</span>);
    }
    for (let i = 0; i < halfStars; i++) {
      stars.push(<span key={`half-${i}`} className="text-yellow-500 star">&#9734;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 star">&#9734;</span>);
    }

    return <div className="star-rating">{stars}</div>;
  };


  const [hoveredAddress, setHoveredAddress] = useState('')
  function handleAddressHover(address) {
    setHoveredAddress((_) => address)
  }
  return (
      <>
        <ActivitiesFilterComponent
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterSubmit={() => fetchActivities()}
        />
        <section className="grid grid-cols-3">
          <div className="grid gap-4 col-span-2 activities-container">
            <div className="upcoming-activities">
              <h2>Activités à Venir</h2>
              <div className="flex flex-wrap gap-4">
                {upcomingActivities.map(activity => <ActivityCard handleMouseEnter={handleAddressHover} activity={activity} key={activity.id} />)}
              </div>
            </div>
            <div className="past-activities">
              <h2>Activités Passées</h2>
              <div className="flex flex-wrap gap-4">
                {pastActivities.map(activity => <ActivityCard handleMouseEnter={handleAddressHover} activity={activity} key={activity.id} />)}
              </div>
            </div>
          </div>
          <MapChart
            address={hoveredAddress}
          ></MapChart>
        </section>
      </>
  );
}
