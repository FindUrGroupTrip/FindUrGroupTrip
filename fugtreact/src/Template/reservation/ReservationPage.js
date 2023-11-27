import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnonymousReservationForm from './AnonymousReservationForm';

const ReservationPage = () => {
    const { idactivite } = useParams();
    const [reservationDetails, setReservationDetails] = useState({ nom: '', email: '' });

    const handleReservationSubmit = (details) => {
        // Vous pouvez envoyer les détails de la réservation à votre backend ici
        console.log('Détails de la réservation:', details);
        // Redirigez l'utilisateur vers une page de confirmation, par exemple.
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Link to={`/activite/${idactivite}`} className="text-gray-500 mt-4 ml-12 hover:text-gray-700">
                <span className="mr-2">&larr;</span> Retour à la page de l'activité
            </Link>
            <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-4 p-6">
                <AnonymousReservationForm idactivite={idactivite} onSubmit={handleReservationSubmit} />
            </div>
        </div>
    );
};

export default ReservationPage;

