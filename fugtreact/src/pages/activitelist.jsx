import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ImageComponent from '../Template/ImageComponent'
import ActivitiesFilterComponent from '../Template/ActivitiesFilterComponent'
import axios from 'axios'

export function Activitelist() {
  const [activities, setActivities] = useState([])
  const [filters, setFilters] = useState({ nom: '', lieu: '', date: '' })

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const fetchActivities = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/activites', {
        params: filters,
      })
      setActivities(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [filters])

  useEffect(() => {
    fetchActivities().then((_) => _)
  }, [fetchActivities])

  return (
    <>
      <ActivitiesFilterComponent
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
        {activities.map((activity) => (
          <Link
            to={`/activites/${activity.id}`}
            key={activity.id}
            className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300"
          >
            {activity.image ? (
              <div className="w-full h-32 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.nom}
                  className="object-cover w-full h-full"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ) : (
              <ImageComponent />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{activity.nom}</h3>
              <p className="text-gray-600">{activity.lieu}</p>
              <p className="text-gray-700">{activity.description}</p>
              <p className="text-gray-500">{activity.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
