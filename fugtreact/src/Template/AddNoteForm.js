import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const AddNoteForm = ({ activite_id, refreshData }) => {
    const [note, setNote] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleStarClick = (clickedNote) => {
        setNote(clickedNote);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (note === 0) {
            setError('Veuillez choisir une note entre 1 et 5');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/activites/${activite_id}/add-note/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note }),
            });

            if (response.ok) {
                console.log('Note ajoutée avec succès!');
                setSuccessMessage('Note ajoutée avec succès!');
                refreshData(); // Refresh activity details after adding the note
            } else {
                console.error('Erreur lors de l\'ajout de la note:', response.statusText);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setError('Erreur lors de la requête: ' + error.message);
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center justify-center">
            <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
                Note (entre 1 et 5) :
            </label>
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={star <= note ? 'text-yellow-500 cursor-pointer text-3xl' : 'text-gray-300 cursor-pointer text-3xl'}
                        onClick={() => handleStarClick(star)}
                    />
                ))}
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            {successMessage && <p className="text-yellow-300 text-xs italic">{successMessage}</p>}
            <button
                type="submit"
                style={{ maxWidth: '200px', width: '100%' }}
                className="bg-yellow-300 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
            >
                Ajouter la note
            </button>
        </form>
    );
};

export default AddNoteForm;
