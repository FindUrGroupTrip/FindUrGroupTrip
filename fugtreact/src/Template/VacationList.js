import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VacationList.css';

function VacationList() {
  const [vacations, setVacations] = useState([]);
  const [selectedVacations, setSelectedVacations] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/vacations/')
      .then(response => {
        setVacations(response.data);
        console.log(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

    const handleCheckboxChange = (idvacation) => {
        setSelectedVacations(prevSelected => {
            const updatedSelected = prevSelected.includes(idvacation)
                ? prevSelected.filter(selectedId => selectedId !== idvacation)
                : [...prevSelected, idvacation];
            console.log('Selected Vacations after Checkbox Change:', updatedSelected);  // Ajoutez cette ligne
            return updatedSelected;
        });
    };


    const handleValidation = () => {
        console.log('Selected Vacations before POST:', selectedVacations);  // Ajoutez cette ligne
        axios.post('http://localhost:8000/api/valider-vacations/', { selectedVacations })
            .then(response => {
                console.log('Mise à jour réussie !', response);
                // ...
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour :', error);
            });
    };


  return (
    <div className="vacation-container">
      <h2 className="vacation-header">Todo List Vacances</h2>
      <div className="update-message">{updateMessage}</div>
      <ul className="vacation-list">
        {vacations.map(vacation => (
          <li key={vacation.idvacation} className={`vacation-item ${vacation.nb_souhait >= 5 ? 'high-demand' : ''}`}>
            <input
              type="checkbox"
              className="vacation-checkbox"
              onChange={() => handleCheckboxChange(vacation.idvacation)}
              checked={selectedVacations.includes(vacation.idvacation)}
            />
            <strong>{vacation.nom}</strong>
            <p>Date: {vacation.date}</p>
            <p>Lieu: {vacation.lieu}</p>
            <p>Description: {vacation.description}</p>
            <p>Nb_souhait: {vacation.nb_souhait}</p>
          </li>
        ))}
      </ul>
      <button className="valider-button" onClick={handleValidation}>
        Valider
      </button>
    </div>
  );
}

export default VacationList;
