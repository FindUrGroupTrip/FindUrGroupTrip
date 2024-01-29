import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './feedback.css';
const CreateFeedbackImage = () => {
    const { idactivite } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [existingImagePath, setExistingImagePath] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [existingImagePaths, setExistingImagePaths] = useState([]);

    const fetchFeedbackImage = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/activites/${idactivite}/GetFeedbackimage/`);
            setExistingImagePaths(response.data.image_paths);
        } catch (error) {
            console.error('Erreur lors de la récupération des images de feedback:', error);
            setErrorMessage('Pas d\'images de feedback encore existantes.');
        }
    };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === existingImagePaths.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? existingImagePaths.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        fetchFeedbackImage();
    }, [idactivite]);

    // Handle file input change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            await axios.post(`http://localhost:8000/api/activites/${idactivite}/AddFeedbackimage/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Image de feedback ajoutée avec succès!');
            setImage(null);
            fetchFeedbackImage();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'image de feedback:', error);
        }
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(`/activites/${idactivite}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <form className="bg-white p-8 shadow-lg rounded-lg w-96" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Ajouter une image de feedback</h2>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                        Télécharger l'image (obligatoire) :
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full mb-3">
                    Ajouter l'image de feedback
                </button>
                <button type="button" onClick={handleBack} className="bg-gray-300 text-gray-800 p-2 rounded-md w-full">
                    Retour à l'activité
                </button>
            </form>
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                {existingImagePaths.length > 0 && (
                    <div className="carousel-container">
                        <div className="carousel-image-wrapper">
                            <img
                                src={`http://localhost:8000${existingImagePaths[currentImageIndex]}`}
                                alt={`Feedback ${currentImageIndex}`}
                                className="carousel-image"
                            />
                        </div>
                        <div className="carousel-controls">
                            <button onClick={prevImage} className="carousel-button prev-button">
                                &lt; Précédent
                            </button>
                            <button onClick={nextImage} className="carousel-button next-button">
                                Suivant &gt;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateFeedbackImage;
