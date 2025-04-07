import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Plotly from 'plotly.js-dist-min';

function MedalsDashboard() {
    const [selectedGraph, setSelectedGraph] = useState('');
    const [plotData, setPlotData] = useState(null);
    const [layout, setLayout] = useState(null);
    const plotContainerRef = useRef(null);

    const handleSelectGraph = (graphType) => {
        if (plotContainerRef.current) {
            Plotly.purge(plotContainerRef.current);
        }
        setSelectedGraph(graphType);
        setPlotData(null);
        setLayout(null);
    };

    useEffect(() => {
        let url = '';

        switch (selectedGraph) {
            case 'countryDisciplineHeatmap':
                url = 'http://localhost:8000/api/medals/country-discipline-heatmap-json/';
                break;
            case 'sunburst':
                url = 'http://localhost:8000/api/medals/sunburst-season-json/';
                break;
            case 'scatter':
                url = 'http://localhost:8000/api/medals/scatter-discipline-country-year-json/';
                break;
            case 'medalsEvolutionTop10':
                url = 'http://localhost:8000/api/medals/medals-evolution-top10-json/';
                break;
            case 'choropleth':
                url = 'http://localhost:8000/api/medals/choropleth-medals-country-json/';
                break;
            case 'evolutionParticipants':
                url = 'http://localhost:8000/api/medals/evolution-participants-json/';
                break;
            case 'medalsBarAnimation':
                url = 'http://localhost:8000/api/medals/medals-bar-animation-json/';
                break;
            case 'top15CountryDiscipline':
                url = 'http://localhost:8000/api/medals/top15-country-discipline-json/';
                break;
            default:
                break;
        }

        if (url) {
            axios.get(url)
                .then(response => {
                    const { data, layout, frames } = response.data;
                    if (selectedGraph === 'medalsBarAnimation') {
                        Plotly.newPlot(plotContainerRef.current, data, layout, { frames, responsive: true });
                    } else {
                        setPlotData(data);
                        setLayout(layout);
                    }
                })
                .catch(error => {
                    console.error('Erreur lors du chargement du graphique interactif:', error);
                });
        }
    }, [selectedGraph]);

    // Correspondance des couleurs fixes
    const colorClasses = {
        blue: 'bg-blue-500 hover:bg-blue-700',
        green: 'bg-green-500 hover:bg-green-700',
        yellow: 'bg-yellow-500 hover:bg-yellow-700',
        purple: 'bg-purple-500 hover:bg-purple-700',
        pink: 'bg-pink-500 hover:bg-pink-700',
        indigo: 'bg-indigo-500 hover:bg-indigo-700',
        red: 'bg-red-500 hover:bg-red-700',
        teal: 'bg-teal-500 hover:bg-teal-700',
        orange: 'bg-orange-500 hover:bg-orange-700',
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gradient-to-b from-white to-gray-100">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center drop-shadow-lg">
                Tableau de Bord Olympique 🏅
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mb-10">
                {[
                    { label: 'Heatmap Médailles (Image)', graph: 'heatmap', color: 'blue' },
                    { label: 'Heatmap Pays/Discipline', graph: 'countryDisciplineHeatmap', color: 'green' },
                    { label: 'Sunburst Médailles Saison', graph: 'sunburst', color: 'yellow' },
                    { label: 'Scatter Discipline/Pays/Année', graph: 'scatter', color: 'purple' },
                    { label: 'Carte Mondiale Médailles', graph: 'choropleth', color: 'pink' },
                    { label: 'Évolution Participants JO', graph: 'evolutionParticipants', color: 'indigo' },
                    { label: 'Bar Chart Médailles Animé', graph: 'medalsBarAnimation', color: 'red' },
                    { label: 'Top 15 Pays par Discipline', graph: 'top15CountryDiscipline', color: 'teal' },
                    { label: 'Évolution Médailles Top 10', graph: 'medalsEvolutionTop10', color: 'orange' },
                ].map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelectGraph(btn.graph)}
                        className={`py-3 px-6 rounded-xl font-semibold shadow-md ${colorClasses[btn.color]} text-white transition duration-300 hover:scale-105`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <div className="w-full flex justify-center">
                {selectedGraph === 'heatmap' && (
                    <img
                        src="http://localhost:8000/api/medals/heatmap/"
                        alt="Heatmap Médailles"
                        className="rounded-2xl shadow-lg w-4/5"
                    />
                )}

                {(selectedGraph !== 'heatmap' && selectedGraph !== 'medalsBarAnimation' && plotData && layout) && (
                    <Plot
                        data={plotData}
                        layout={layout}
                        style={{ width: '90%', height: '600px' }}
                    />
                )}

                {selectedGraph === 'medalsBarAnimation' && (
                    <div ref={plotContainerRef} className="w-11/12 h-[600px] bg-white rounded-2xl shadow-lg" />
                )}
            </div>
        </div>
    );
}

export default MedalsDashboard;
