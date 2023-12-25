// src/pages/Forum.jsx
import React, { useState, useEffect } from 'react';

const Forum = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        title: '',
        content: '',
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion((prevQuestion) => ({
            ...prevQuestion,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/questions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
            });
            const data = await response.json();
            setQuestions([...questions, data]);
            setNewQuestion({ title: '', content: '' });
        } catch (error) {
            console.error('Erreur lors de la création de la question :', error);
        }
    };

    return (
        <div>
            <h1>Forum</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={newQuestion.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Content:
                    <textarea
                        name="content"
                        value={newQuestion.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>
                <button type="submit">Ask Question</button>
            </form>
            {questions.map((question) => (
                <div key={question.id}>
                    <h2>{question.title}</h2>
                    <p>{question.content}</p>
                    <p>Author : {question.author.username}</p>
                    <p>Created at : {question.created_at}</p>
                </div>
            ))}
        </div>
    );
};
s
export default Forum;
