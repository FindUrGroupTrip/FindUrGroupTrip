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
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (idvacation) => {
    setSelectedVacations(prevSelected => {
      if (prevSelected.includes(idvacation)) {
        return prevSelected.filter(selectedId => selectedId !== idvacation);
      } else {
        return [...prevSelected, idvacation];
      }
    });
  };

  const handleValidation = () => {
    axios.post('http://localhost:8000/api/valider-vacations/', { selectedVacations })
      .then(response => {
        console.log('Mise à jour réussie !');
        setUpdateMessage('Mise à jour réussie !');
        setVacations(prevVacations =>
          prevVacations.map(vacation => ({
            ...vacation,
            nb_souhait: selectedVacations.includes(vacation.idvacation)
              ? vacation.nb_souhait + 1
              : vacation.nb_souhait,
          }))
        );
        setSelectedVacations([]);
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
