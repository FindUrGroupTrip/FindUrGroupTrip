import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageComponent from './ImageComponent';

const SingleActivite = () => {
    const { idactivite } = useParams();
    const [activite, setActivite] = useState(null);

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

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {activite ? (
                <div className="max-w-md w-full mx-auto bg-white rounded-md shadow-md overflow-hidden">
                    <div className="bg-gray-300 text-gray-700 p-6 text-center">
                        <h2 className="text-3xl font-semibold">{activite.nom}</h2>
                        <p className="text-sm mt-2">Emplacement : {activite.lieu}</p>
                        <p className="text-sm">A la date suivante: {activite.date}</p>
                    </div>
                    <div className="p-6 text-gray-700 text-center">
                        <p className="text-lg mb-4">Briève description de l'activité : {activite.description}</p>
                        {/* Ajoutez d'autres détails en conséquence */}
                    </div>
                    {activite.image ? (
                        <div className="w-full h-64 overflow-hidden">
                            <img
                                src={activite.image}
                                alt={activite.nom}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ) : (
                        <ImageComponent />
                    )}
                </div>
            ) : (
                <p className="text-center">Chargement des détails de l'activité...</p>
            )}
        </div>
    );
};

export default SingleActivite;






