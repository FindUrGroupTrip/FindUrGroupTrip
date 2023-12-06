import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../Template/ImageComponent';

export function Activitelist() {
    const [activities, setActivities] = useState([]);

    // Utilisez useEffect pour charger les activités depuis votre backend lorsque le composant est monté
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/activites');
                if (!response.ok) {
                    throw new Error('Échec de la requête pour récupérer les activités');
                }
                const activitiesData = await response.json();
                setActivities(activitiesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des activités:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <>
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
    );
}
