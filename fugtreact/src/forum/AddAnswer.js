// AddAnswer.js
import React, { useState } from 'react';
import axios from 'axios';

const AddAnswer = ({ questionId, fetchQuestions }) => {
  const [content, setContent] = useState('');

  const handlePostAnswer = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/answers/create/',
        { question: questionId, content },
        { headers: { Authorization: 'Token VOTRE_TOKEN' } }
      );
      console.log('Réponse ajoutée avec succès :', response.data);
      // Rafraîchir la liste des questions après l'ajout
      fetchQuestions();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réponse :', error);
    }
  };

  return (
    <div>
      <h3>Répondre à la question :</h3>
      <label htmlFor="content">Contenu de la réponse :</label>
      <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button className="add-answer-button" onClick={handlePostAnswer}>Ajouter votre réponse</button>
    </div>
  );
};

export default AddAnswer;
