// Forum.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import AddAnswer from './AddAnswer';
import './forum.css';

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/questions/');
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des questions :', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/answers/?question_id=${questionId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors du chargement des réponses pour la question ${questionId} :`, error);
      return [];
    }
  };

  const handleToggleAnswers = async (questionId) => {
    const updatedQuestions = [...questions];

    const questionToUpdate = updatedQuestions.find((q) => q.id === questionId);
    questionToUpdate.showAnswers = !questionToUpdate.showAnswers;

    if (questionToUpdate.showAnswers && !questionToUpdate.answers) {
      const answers = await fetchAnswers(questionId);
      questionToUpdate.answers = answers;
    }

    setQuestions(updatedQuestions);
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/questions/');
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des questions :', error);
      setLoading(false);
    }
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
          {questions.map((question) => (
            <div key={question.id}>
              <h3>{question.title}</h3>
              <p>{question.content}</p>
              <p className="author-info">Posté par : {question.author}</p>
              <button onClick={() => handleToggleAnswers(question.id)} className="toggle-answers-button">
              {question.showAnswers ? 'Masquer les réponses' : 'Voir les réponses'}
              </button>
              {question.showAnswers && (
                <div>
                  {question.answers &&
                    question.answers.map((answer) => (
                      <div key={answer.id}>
                        <p className="answer-content">{answer.content}</p>
                        <p className="author-info">Posté par : {answer.author}</p>
                        <hr />
                      </div>
                    ))}
                     <AddAnswer questionId={question.id} fetchQuestions={fetchQuestions} />
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
      )}

      <AddQuestion fetchQuestions={fetchQuestions} />
    </div>
  );
};

export default Forum;
