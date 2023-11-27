import React, { useState } from 'react';

const AnonymousReservationForm = ({ idactivite, onSubmit }) => {
    const [reservationDetails, setReservationDetails] = useState({
        nom: '',
        email: '',
        // Ajoutez d'autres champs nécessaires pour la réservation
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validez les données du formulaire avant de les soumettre
        // ...

        // Envoyez les détails de la réservation au backend via le proxy
        try {
            const response = await fetch(`api/activites/${idactivite}/reservation-anonyme/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activite_id: idactivite, // Utilisez activite_id au lieu de activite dans vos données
                    nom: reservationDetails.nom,
                    email: reservationDetails.email,
                    // Ajoutez d'autres champs nécessaires pour la réservation anonyme
                }),
            });

            if (response.ok) {
                // Gérez la réussite de la réservation, par exemple redirigez l'utilisateur
                console.log('Réservation réussie');
            } else {
                // Gérez l'échec de la réservation
                console.error('Échec de la réservation');
            }
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-4 p-6">
            <h2 className="text-2xl font-semibold mb-6">Formulaire de Réservation Anonyme</h2>
            <div className="mb-4">
                <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">
                    Nom :
                </label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={reservationDetails.nom}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email :
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={reservationDetails.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-4 hover:bg-blue-700">
                Réserver Anonymement
            </button>
        </form>
    );
};

export default AnonymousReservationForm;



