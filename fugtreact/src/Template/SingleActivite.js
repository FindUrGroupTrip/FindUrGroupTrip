

import ImageComponent from './ImageComponent';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const SingleActivite = () => {
    const { idactivite } = useParams();
    const [activite, setActivite] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActiviteDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/activites/${idactivite}`);
                const data = await response.json();
                setActivite(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'activité:', error);
            }
        };

        fetchActiviteDetails();
    }, [idactivite]);

    const handleReservationClick = () => {
        // Rediriger vers le formulaire de réservation avec l'ID de l'activité
        navigate(`/reservation-form/${idactivite}`);
    };


return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
        <Link to="/activitelist" className="text-gray-500 mt-4 ml-12 hover:text-gray-700">
            <span className="mr-2">&larr;</span> Retour à la liste d'activités
        </Link>
        {activite ? (
            <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-4">
                <div className="bg-gray-300 text-gray-700 p-6 text-center">
                    <h2 className="text-3xl font-semibold">{activite.nom}</h2>
                    <p className="text-sm mt-2">Emplacement : {activite.lieu}</p>
                    <p className="text-sm">À la date suivante : {activite.date}</p>
                    <p className="text-lg mb-4">Brève description de l'activité : {activite.description}</p>
                </div>
                <button
                    onClick={handleReservationClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Réserver
                </button>
                {activite.image ? (
                    <div className="w-full h-64 overflow-hidden">
                        <img
                            src={activite.image}
                            alt={activite.nom}
                            className="object-cover w-full h-full"
                        />
                        <button
                            onClick={handleReservationClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Réserver
                        </button>
                    </div>
                ) : (
                    <ImageComponent />
                )}
            </div>
        ) : (
            <p className="text-center mt-4">Chargement des détails de l'activité...</p>
        )}
    </div>
);
};

export default SingleActivite;
