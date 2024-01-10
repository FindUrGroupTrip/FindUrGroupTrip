import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../Template/ImageComponent';
import AddNoteForm from "../Template/AddNoteForm";
import ActivitiesFilterComponent from '../Template/ActivitiesFilterComponent';
import axios from 'axios';

export function Activitelist() {
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({ nom: '', lieu: '', date: '' });

  const handleFilterChange = (e) => {
    setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value }));
  };

  const handleFilterSubmit = async () => {
    try {
      console.log('Filters before request:', filters);
      const response = await axios.get('http://localhost:8000/api/activites', {
        params: filters,
      });
      console.log('Response:', response.data);
      setActivities(response.data);
      // Réinitialisation des filtres après la requête réussie
      setFilters({ nom: '', lieu: '', date: '' });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchActivities = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/activites', {
        params: filters,
      });
      console.log('Response Data:', response.data);
      console.log('Response Data:', response.data.average_rating);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filters]);
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500 star">&#9733;</span>);
    }

    // Half stars
    for (let i = 0; i < halfStars; i++) {
      stars.push(<span key={`half-${i}`} className="text-yellow-500 star">&#9734;</span>);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 star">&#9734;</span>);
    }

    return <div className="star-rating">{stars}</div>;
  };
  useEffect(() => {
    fetchActivities().then((_) => _);
  }, [fetchActivities]);

    return (
      <>
        <ActivitiesFilterComponent
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterSubmit={handleFilterSubmit}
            />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
                    {activities.map((activity) => (
                      <Link
                        to={`/activites/${activity.id}`}
                        key={activity.id}
                        className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300"
                      >

                        <div className="p-4 bg-white rounded-md shadow-md max-w-md mx-auto">
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
                                <div className="w-full h-40 overflow-hidden flex items-center justify-center mb-4">
                                  <ImageComponent style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                                </div>
                            )}

                            <h3 className="text-lg font-semibold mb-2">{activity.nom}</h3>
                            <p className="text-gray-600">{activity.lieu}</p>
                            <p className="text-gray-700">{activity.description}</p>
                            <p className="text-gray-500">{activity.date}</p>

                            {activity && (
                                <div className="mt-4">
                                  <div>
                                    <p className="text-yellow-500 text-sm mt-2 justify-center">{`Note moyenne : `}</p>
                                    <StarRating rating={activity.average_rating} />
                                  </div>
                                  <p className="text-yellow-600 text-sm mt-2">{`Nombre de notes : ${activity.number_of_notes} `}</p>
                                </div>
                            )}
                          </div>
                        </div>

                      </Link>
                ))}
            </div>
        </>
    );
}

