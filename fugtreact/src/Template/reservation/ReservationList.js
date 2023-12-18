// ReservationsList.js

import React, { useState, useEffect } from 'react';

const ReservationsList = ({ idActivite }) => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/reservations/${idActivite}/`);
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des réservations:', error);
            }
        };

        fetchReservations();
    }, [idActivite]);

    return (
        <div className="mt-6 mx-auto max-w-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Les réservations associées à cette activité :</h3>
            <div className="overflow-x-auto">
                {reservations.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border-b">Nom</th>
                            <th className="py-2 px-4 border-b pr-4">Prénom</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservations.map((reservation, index) => (
                            <tr key={index} className="hover:bg-gray-100 transition-all duration-300">
                                <td className="py-2 px-4 border-b">{reservation.nom}</td>
                                <td className="py-2 px-4 border-b pr-4">{reservation.prenom}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucune réservation pour cette activité.</p>
                )}
            </div>
        </div>
    );
};

export default ReservationsList;
