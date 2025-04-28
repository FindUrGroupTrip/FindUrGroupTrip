import React from 'react';
import axios from 'axios';

function Prediction2024() {
    const handleRegenerate = async () => {
        if (window.confirm("")) {
            try {
                const res = await axios.get("http://localhost:8000/api/medals/medals_predictions_ml2024/");
                alert(res.data.message);
            } catch (err) {
                alert("Erreur lors de la régénération du modèle !");
                console.error(err);
            }
        }
    };

    return (
        <div className="flex justify-center my-6">
            <button
                onClick={handleRegenerate}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow"
            >
                Prédiction 2024
            </button>
        </div>
    );
}

export default Prediction2024;