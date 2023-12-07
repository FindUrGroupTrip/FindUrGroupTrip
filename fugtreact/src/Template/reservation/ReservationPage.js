// ReservationPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReservationForm from './ReservationForm';
import ReservationComponent from './ReservationComponent';

const ReservationPage = () => {
    const { idactivite } = useParams();
    const [reservationDetails, setReservationDetails] = useState({ nom: '', prenom: '' });
    const [reservationConfirmed, setReservationConfirmed] = useState(false);

    const handleReservationSubmit = (details) => {
        // You can send reservation details to your backend here
        console.log('Détails de la réservation:', details);
        // Update state to show the confirmation component
        setReservationDetails(details);
        setReservationConfirmed(true);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Link to={`/activites/${idactivite}`} className="text-gray-500 mt-4 ml-12 hover:text-gray-700">
                <span className="mr-2">&larr;</span> Retour à la page de l'activité
            </Link>
            <div className="max-w-md mx-auto mt-4">
                {reservationConfirmed ? (
                    <ReservationComponent reservationDetails={reservationDetails} />
                ) : (
                    <ReservationForm idactivite={idactivite} onSubmit={handleReservationSubmit} />
                )}
            </div>
        </div>
    );
};

export default ReservationPage;

