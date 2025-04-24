import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import PredictionControls from './PredictionControls';

function PredictionMedals() {
    const [data, setData] = useState(null);
    const [layout, setLayout] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/medals/ml-predictions/')
            .then(res => {
                const { data, layout } = res.data;
                setData(data);
                setLayout(layout);
            })
            .catch(err => {
                console.error('Erreur lors du chargement des prédictions ML :', err);
            });
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-b from-white to-gray-100">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                🔮 Prédictions de Médailles Olympiques (2020)
            </h1>

            {/* 👉 Bouton pour recalculer les prédictions */}
            <PredictionControls/>

            {data && layout ? (
                <Plot
                    data={data}
                    layout={layout}
                    style={{width: '90%', height: '600px'}}
                />
            ) : (
                <p className="text-gray-600 text-lg">Chargement des données de prédiction...</p>
            )}
            <button
                onClick={() => {
                    axios.get('http://localhost:8000/api/medals/compare-ml-vs-real/')
                        .then(res => {
                            const {data, layout} = res.data;
                            setData(data);
                            setLayout(layout);
                        })
                        .catch(err => console.error(err));
                }}
                className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-700 transition"
            >
                Comparer avec Réel 2020
            </button>
        </div>

    );
}

export default PredictionMedals;
