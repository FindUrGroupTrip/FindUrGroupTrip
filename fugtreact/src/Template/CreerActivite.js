import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreerActivite = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [isSubmitted, setIsSubmitted] = useState(null);
    const [image, setImage] = useState(null);

    const onSubmit = async (data) => {
        try {
            const areAllFieldsFilled = Object.values(data).every((value) => value !== '');

            if (!areAllFieldsFilled) {
                console.error('Tous les champs doivent être remplis');
                return;
            }

            const formData = new FormData();
            formData.append('nom', data.nom);
            formData.append('lieu', data.lieu);
            formData.append('description', data.description);
            formData.append('date', data.date);
            formData.append('image', data.image[0]);

            const response = await fetch('http://localhost:8000/api/creer_activite/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Échec de la requête');
            }

            setIsSubmitted(true);
            reset();

            if (data.image[0]) {
                setImage(URL.createObjectURL(data.image[0]));
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend:', error);
            setIsSubmitted(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Créer votre activité</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                        Titre de votre activité* :
                    </label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        {...register('nom', { required: 'Ce champ est requis' })}
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.nom ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.nom && <p className="text-red-500 text-xs italic">{errors.nom.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lieu">
                        Lieu* :
                    </label>
                    <input
                        type="text"
                        id="lieu"
                        name="lieu"
                        {...register('lieu', { required: 'Ce champ est requis' })}
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.lieu ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.lieu && <p className="text-red-500 text-xs italic">{errors.lieu.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description* :
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        {...register('description', { required: 'Ce champ est requis' })}
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.description ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date* :
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        {...register('date', { required: 'Ce champ est requis' })}
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.date ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.date.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image :
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        {...register('image', { required: 'Ce champ est requis' })}
                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.image ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
                </div>
                {image && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preview">
                            Image ajoutée :
                        </label>
                        <img src={image} alt="Preview" className="max-w-full mb-2" />
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Enregistrer
                    </button>
                    {isSubmitted && <p className="text-green-500 text-xs italic">Enregistrement réussi !</p>}
                    {isSubmitted === false && <p className="text-red-500 text-xs italic">Échec de l'enregistrement.</p>}
                </div>
            </form>
        </div>
    );
};

export default CreerActivite;
