import React, { useState } from 'react';
import AddNoteForm from './AddNoteForm';

const AddNote = ({ activiteId, refreshData }) => {
    return (
        <div>
            <h2>Ajouter une note</h2>
            <AddNoteForm activite_id={activiteId} refreshData={refreshData} />
        </div>
    );
};

export default AddNote;
