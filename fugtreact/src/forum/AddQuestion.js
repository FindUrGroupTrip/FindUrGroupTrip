// AddQuestion.js
import React, { useState } from 'react';
import axios from 'axios';
import './forum.css';


const AddQuestion = ({ fetchQuestions }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePostQuestion = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/questions/',
        { title, content },
        { headers: { Authorization: 'Token VOTRE_TOKEN' } }
      );
      console.log('Question ajoutée avec succès:', response.data);
      // Rafraîchir la liste des questions après l'ajout
      fetchQuestions();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la question :', error);
    }
  };

  return (
    <div >
      <h2>Poser une question</h2>
      <label htmlFor="title">Titre :</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label htmlFor="content">Contenu :</label>
      <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button onClick={handlePostQuestion}>Poser la question</button>
    </div>
  );
};

export default AddQuestion;
