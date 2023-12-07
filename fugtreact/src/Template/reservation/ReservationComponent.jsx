import React from 'react';

const ReservationComponent = ({ reservationDetails }) => {
    return (
        <div>
            <p>Réservation réussie!</p>
            <p>Nom: {reservationDetails.nom}</p>
            <p>Prénom: {reservationDetails.prenom}</p>
            {/* Autres détails de la réservation si nécessaire */}
        </div>
    );
};

export default ReservationComponent;
