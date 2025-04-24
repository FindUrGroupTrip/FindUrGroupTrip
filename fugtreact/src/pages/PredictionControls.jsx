import React from 'react';
import axios from 'axios';

function PredictionControls() {
    const handleRegenerate = async () => {
        if (window.confirm("Tu veux vraiment recalculer les prédictions ? Cela peut prendre un peu de temps.")) {
            try {
                const res = await axios.get("http://localhost:8000/api/medals/regenerate-ml/");
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
                🔁 Recalculer les prédictions ML
            </button>
        </div>
    );
}

export default PredictionControls;
