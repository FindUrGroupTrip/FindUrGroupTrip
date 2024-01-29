import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
    const CreateWhatsAppChannel = () => {
        const { idactivite } = useParams();
        const navigate = useNavigate();
        const [whatsappLink, setWhatsAppLink] = useState('');
        const [existingLink, setExistingLink] = useState('');
        const [errorMessage, setErrorMessage] = useState('');

        // Déplacer la définition de fetchWhatsAppLink ici
        const fetchWhatsAppLink = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/activites/${idactivite}/get_whatsapp/`);
                setExistingLink(response.data.link);
            } catch (error) {
                console.error('Erreur lors de la récupération du lien WhatsApp:', error);
                setErrorMessage('Pas de lien Whatsapp encore existant.');
            }
        };

        useEffect(() => {
            fetchWhatsAppLink();
        }, [idactivite, fetchWhatsAppLink]);

    const handleWhatsAppLinkChange = (e) => {
        setWhatsAppLink(e.target.value);
    };

    const updateLink = async (idActivite, link) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/activites/${idActivite}/update_whatsapp/`, {
                link: link,
            });
            if (response.data.updated) {
                alert('Canal WhatsApp mis à jour avec succès!');
                fetchWhatsAppLink();
            } else {
                setErrorMessage('');
                fetchWhatsAppLink();
            }
        } catch (error) {
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/activites/${idactivite}/AddWhatsapp/`, {
                link: whatsappLink,
            });

            if (response.data.exists) {
                const updateConfirmed = window.confirm("Un lien existe déjà pour cette activité. Voulez-vous le mettre à jour ?");
                if (updateConfirmed) {
                    updateLink(idactivite, whatsappLink);
                }
            } else if (response.data.created) {
                alert('Canal WhatsApp créé avec succès!');
                setWhatsAppLink('');
                fetchWhatsAppLink();
            } else {
                setErrorMessage('Erreur lors de la création du canal WhatsApp.');
                fetchWhatsAppLink();
            }
        } catch (error) {
            console.error('Erreur lors de la création du canal WhatsApp:', error);
            setErrorMessage('Erreur lors de la création du canal WhatsApp.');
        }
    };
    const handleBack = () => {
        navigate(`/activites/${idactivite}`); // Modifier selon votre route d'activité
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <form className="bg-white p-8 shadow-lg rounded-lg w-96" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Gérer le canal WhatsApp</h2>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                        Lien d'invitation WhatsApp (facultatif) :
                    </label>
                    <input
                        type="text"
                        name="whatsappLink"
                        value={whatsappLink}
                        onChange={handleWhatsAppLinkChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full mb-3">
                    Créer ou mettre à jour le canal WhatsApp
                </button>
                <button type="button" onClick={handleBack} className="bg-gray-300 text-gray-800 p-2 rounded-md w-full">
                    Retour à l'activité
                </button>
                {existingLink && (
                    <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                        <p className="text-lg font-medium text-gray-800 mb-2">Lien WhatsApp existant:</p>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                value={existingLink}
                                className="p-2 border border-gray-300 rounded-md w-full text-gray-600"
                                readOnly
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(existingLink)}
                                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 text-sm rounded"
                            >
                                Copier le lien
                            </button>
                        </div>
                    </div>
                )}

            </form>
        </div>
    );
};



export default CreateWhatsAppChannel;
