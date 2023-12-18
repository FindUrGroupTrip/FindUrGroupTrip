// Votre composant React
import React, { useState, useEffect } from 'react';

const ActiviteReservations = ({ idActivite }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/reservations_par_activite/${idActivite}/`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, [idActivite]);

    return (
        <div>
            {data ? (
                <div>
                    <h2>{data.activite}</h2>
                    <ul>
                        {data.reservations.map((reservation, index) => (
                            <li key={index}>{`${reservation.nom} ${reservation.prenom}`}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </div>
    );
};

export default ActiviteReservations;
