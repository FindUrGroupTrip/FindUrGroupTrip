// ContactRequests.js (composant React)

import React, { useState, useEffect } from 'react';
import './ContactRequest.css';

const ContactRequests = () => {
    const [contactRequests, setContactRequests] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/contact-requests/')
            .then(response => response.json())
            .then(data => setContactRequests(data))
            .catch(error => console.error('Error fetching contact requests:', error));
    }, []);

    return (
        <div>
            <h1>Les tickets ouverts :</h1>
            {contactRequests.length > 0 ? (
                <div className="ticket-container">
                    {contactRequests.map(request => (
                        <div key={request.id} className="ticket">
                            <h2>Sujet : {request.subject}</h2>
                            <h4>Message : {request.message}</h4>
                            <p>De : {request.from_email}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No contact requests found.</p>
            )}
        </div>
    );
};

export default ContactRequests;
