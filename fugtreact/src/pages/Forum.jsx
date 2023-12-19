// src/pages/Forum.jsx
import React, { useState, useEffect } from 'react';

const Forum = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/questions/');
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des questions :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Forum</h1>
            {questions.map(question => (
                <div key={question.id}>
                    <h2>{question.title}</h2>
                    <p>{question.content}</p>
                    <p>Author: {question.author.username}</p>
                    <p>Created at: {question.created_at}</p>
                </div>
            ))}
        </div>
    );
};

export default Forum;
