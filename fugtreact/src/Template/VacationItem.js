// VacationItem.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VacationList.css';  // Importez votre fichier CSS

const VacationItem = ({ reservation, onRemoveReservation }) => {
  const [isFavorite, setIsFavorite] = useState(reservation.is_favorite);
  const { activite } = reservation;

  const handleToggleFavorite = async () => {
    try {
      await axios.put(`http://localhost:8000/api/toggle-favorite/${reservation.id}/`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className={`vacation-item-container ${isFavorite ? 'favorite' : ''}`}>
      <div className="details-container">
        <h3 className="activite-title">{reservation.activite.nom}</h3>
        <p className="activite-description">{activite.description}</p>
        <p className="activite-lieu">Lieu : {activite.lieu}</p>
        <p className="activite-date">Date : {activite.date}</p>
        <Link to={`/activites/${activite.id}`} className="details-button">
                    Voir détails
                </Link>
      </div>

      <div className="buttons-container">
        <button className="remove-button" onClick={() => onRemoveReservation(reservation.id)}>
          Supprimer
        </button>

        <button className="favorite-button" onClick={handleToggleFavorite}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default VacationItem;
