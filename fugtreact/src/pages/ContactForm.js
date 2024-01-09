// ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Importez le fichier CSS de Tailwind

const ContactForm = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        from_email: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifiez si tous les champs sont remplis
        if (!formData.subject || !formData.message || !formData.from_email) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/contact/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSuccessMessage('Email envoyé avec succès!');
            setErrorMessage(''); // Effacez le message d'erreur s'il y en a un
            // Réinitialisez le formulaire
            setFormData({
                subject: '',
                message: '',
                from_email: '',
            });

            // Rafraîchissement de la page après 2 secondes (2000 millisecondes)
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage('Une erreur s\'est produite lors de l\'envoi de l\'email.');
            setSuccessMessage(''); // Effacez le message de succès s'il y en a un
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white p-8 shadow-md rounded-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600 block">Nature de votre demande :</label>
                    <input type="text" name="subject" onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600 block">Détails de votre demande :</label>
                    <textarea name="message" onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-64" required></textarea>
                </div>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600 block">Votre email de contact :</label>
                    <input type="email" name="from_email" onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Valider</button>
            </form>
        </div>
    );
};

export default ContactForm;
