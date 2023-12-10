import React, { useState } from 'react';

const AddNoteForm = ({ activite_id }) => {
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const handleNoteChange = (e) => {
        setNote(e.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the note is a valid number between 1 and 5
        const parsedNote = parseInt(note, 10);
        if (isNaN(parsedNote) || parsedNote < 1 || parsedNote > 5) {
            setError('La note doit être un nombre entre 1 et 5');
            return;
        }

        // Send the note to the backend
        try {
            const response = await fetch(`http://localhost:8000/api/activites/${activite_id}/add-note/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note: parsedNote }),
            });

            if (response.ok) {
                // Handle success (you may redirect or show a success message)
                console.log('Note ajoutée avec succès!');
            } else {
                // Handle error
                console.error('Erreur lors de l\'ajout de la note:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
                Note (entre 1 et 5) :
            </label>
            <input
                type="number"
                id="note"
                name="note"
                value={note}
                onChange={handleNoteChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min="1"
                max="5"
                required
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
            >
                Ajouter la note
            </button>
        </form>
    );
};

export default AddNoteForm;
