import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReservationForm = () => {
    const { idactivite } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [reservationSuccess, setReservationSuccess] = useState(null);
    const [reservationError, setReservationError] = useState(null);

    const handleReservationSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/creer_activite_reservation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    prenom,
                    id_activite: idactivite,
                }),
            });

            if (response.ok) {
                // Réservation réussie
                setReservationSuccess('Réservation réussie!');
                setReservationError(null);
            } else {
                // Erreur lors de la réservation
                setReservationSuccess(null);
                setReservationError('Erreur lors de la réservation: ' + response.statusText);
            }
        } catch (error) {
            // Erreur lors de la réservation
            setReservationSuccess(null);
            setReservationError('Erreur lors de la réservation: ' + error.message);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <form className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-4 p-6" onSubmit={handleReservationSubmit}>
                <h2 className="text-3xl font-semibold mb-4">Formulaire de Réservation</h2>
                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    required
                />
                <input
                    type="text"
                    placeholder="Prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Réserver
                </button>

                {reservationSuccess && <p className="text-green-500 mt-2">{reservationSuccess}</p>}
                {reservationError && <p className="text-red-500 mt-2">{reservationError}</p>}
            </form>
        </div>
    );
};

export default ReservationForm;
