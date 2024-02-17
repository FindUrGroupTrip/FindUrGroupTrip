import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VacationList.css';

const VacationForm = ({ onAddReservation }) => {
    const [activityOptions, setActivityOptions] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('');

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivityOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/activity-options/');
                setActivityOptions(response.data);
            } catch (error) {
                console.error('Error fetching activity options:', error);
            }
        };

        fetchActivityOptions();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/add-user-reservation/', {
                activityId: selectedActivity,

            });

            // Traitez la réponse (peut-être redirigez l'utilisateur ou effectuez d'autres actions nécessaires)
            console.log(response.data);

            // Appel de la fonction fournie par le composant parent pour mettre à jour la liste
            onAddReservation(selectedActivity);
        } catch (error) {
            // Gérez les erreurs ici (affichez un message d'erreur, etc.)
            if (error.response && error.response.status === 400) {
                setError('Vous avez déjà réservé cette activité.');
            } else if (error.response && error.response.status === 404) {
                setError('L\'activité n\'existe pas.');
            } else {
                setError('Une erreur s\'est produite lors de la réservation.');
            }
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleFormSubmit}>
                <label>
                    enregistrer directement ici en choisissant vos activités préférées :
                    <select name="activityId" value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
                        <option value="">Sélectionnez une activité</option>
                        {activityOptions.map((activity) => (
                            <option key={activity.id} value={activity.id}>
                                {activity.name}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Suppression de l'option Ajouter aux favoris ici */}
                <button type="submit" disabled={!selectedActivity}>Enregistrer</button>
            </form>
        </div>
    );
};

export default VacationForm;
