import ImageComponent from './ImageComponent';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AddNoteForm from './AddNoteForm';
import ReservationsList from './reservation/ReservationList';
import whatsappIcon from './WhatsApp.png';
const SingleActivite = () => {
    const { idactivite } = useParams();
    const [activite, setActivite] = useState(null);
    const navigate = useNavigate();

    // Function to refresh the activity details
    const refreshActiviteDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/activites/${idactivite}`);
            const data = await response.json();
            setActivite({
                ...data,
                average_rating: data.average_rating || 0,
                number_of_notes: data.number_of_notes || 0,
                image_path: data.image_path
            });
            console.log('Activite Data:', data);
            console.log('URL de l\'image:', activite.image_path);
            console.log('Response Data:', activite.average_rating);
            console.log('Response Data:', activite.number_of_notes);

        } catch (error) {
            console.error('Erreur lors de la récupération des détails de l\'activité:', error);
        }
    };

    // Fetch activity details when the component mounts
    useEffect(() => {
        refreshActiviteDetails();
    }, [idactivite]);

    // Handle the click event for the 'Réserver' button
    const handleReservationClick = () => {
        navigate(`/reservation-form/${idactivite}`);
    };
    const handleCreateWhatsAppChannelClick = () => {
        navigate(`/whatsapp-form/${idactivite}`);
    };
    const handleCreateFeedbackImageClick = () => {
        navigate(`/feedbackimage-form/${idactivite}`);
    };

    // Function to refresh the activity details after adding a note

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Back to the list of activities link */}
            <Link to="/activitelist" className="text-gray-500 mt-4 ml-12 hover:text-gray-700">
                <span className="mr-2">&larr;</span> Retour à la liste d'activités
            </Link>

            {/* Render activity details */}
            {activite ? (
                <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-4">
                    {/* Activity details */}
                    <div className="bg-gray-300 text-gray-700 p-6 text-center">
                        <h2 className="text-3xl font-semibold">{activite.nom}</h2>
                        <p className="text-sm mt-2">Emplacement : {activite.lieu}</p>
                        <p className="text-sm">À la date suivante : {activite.date}</p>
                        <p className="text-lg mb-4">Brève description de l'activité : {activite.description}</p>

                        {/* Reservation button */}
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <button
                                onClick={handleReservationClick}
                                style={{ maxWidth: '140px', width: '100%', marginBottom: '10px' }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Réserver
                            </button>
                            <button
                                onClick={handleCreateWhatsAppChannelClick}
                                style={{ maxWidth: '200px', width: '100%' }}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                            >
                                <img src={whatsappIcon} className="fill-current w-4 h-4 mr-2" alt="WhatsApp"/>
                                <span>Canal WhatsApp</span>
                            </button>
                            <button
                                onClick={handleCreateFeedbackImageClick}
                                style={{ maxWidth: '250px', width: '100%', marginBottom: '10px' }}
                                className="bg-blue-400 text-white px-4 py-2 rounded-md"
                            >
                                Ajouter ou voir les photos
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-64 overflow-hidden mt-4">
                        {activite.image_path ? (
                            <img
                                src={`http://localhost:8000${activite.image_path}`}
                                alt={activite.nom}
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            <ImageComponent />
                        )}
                    </div>

                    {activite && (
                        <div className="mt-4">
                            <AddNoteForm activite_id={idactivite} refreshData={refreshActiviteDetails}/>
                        </div>
                    )}

                </div>
            ) : (
                // Loading message
                <p className="text-center mt-4">Chargement des détails de l'activité...</p>
            )}

            <ReservationsList idActivite={idactivite} />
        </div>
    );
};

export default SingleActivite;
