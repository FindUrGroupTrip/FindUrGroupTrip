// VacationList.js
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VacationItem from './VacationItem';
import VacationForm from './VacationForm';
import './VacationList.css';

const VacationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleAddReservation = async (activiteId, isFavorite) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/add-user-reservation/', { activityId: activiteId, is_favorite: isFavorite });
        } catch (error) {
            console.error('Error adding reservation:', error);
        }
        fetchReservations();
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user-reservations/');
            const sortedReservations = response.data.sort((a, b) => {
                // Convertissez les dates en objets Date pour les comparer
                const dateA = new Date(a.activite.date);
                const dateB = new Date(b.activite.date);

                // Triez par ordre croissant (les dates futures d'abord)
                return dateA - dateB;
            });

            setReservations([...sortedReservations]);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleRemoveReservation = async (reservationId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/remove-user-reservation/${reservationId}/`);
            fetchReservations();
        } catch (error) {
            console.error('Error removing reservation:', error);
        }
    };

    return (
      <div className="container">
        <h2 className="title">Mes activités</h2>

        {reservations.map((reservation) => (
          <VacationItem
            key={reservation.id}
            reservation={reservation}
            onRemoveReservation={handleRemoveReservation}
          />
        ))}
        <p>Vous voulez ajouter des réservations? Consultez notre <Link to="/activitelist" className="link-to-activities">liste des activités intéressantes</Link>.</p>
        <VacationForm onAddReservation={handleAddReservation} />
      </div>
    );
};

export default VacationList;
