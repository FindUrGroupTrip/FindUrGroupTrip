import React, { useState } from 'react';
import axios from 'axios';

const AddNote = ({ idactivite, refreshData }) => {
    const [note, setNote] = useState('');

    const handleAddNote = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/activites/${idactivite}/add-note/`, { note });
            console.log(response.data);
            // Handle success, e.g., show a success message
            refreshData(); // Refresh the data after adding a note
        } catch (error) {
            console.error('Error adding note:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div>
            <input type="number" min="1" max="5" value={note} onChange={(e) => setNote(e.target.value)} />
            <button onClick={handleAddNote}>Add Note</button>
        </div>
    );
};

export default AddNote;