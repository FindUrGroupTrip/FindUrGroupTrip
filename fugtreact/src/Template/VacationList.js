import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VacationList = () => {
    const [vacations, setVacations] = useState([]);

    useEffect(() => {
        // Faites une requête pour obtenir les vacances depuis l'API Django
        axios.get('/api/vacations/')
            .then(response => setVacations(response.data))
            .catch(error => console.error('Error fetching vacations', error));
    }, []);

    return (
        <div>
            <h2>Liste des Vacances</h2>
            <ul>
                {vacations.map(vacation => (
                    <li key={vacation.id}>{vacation.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default VacationList;