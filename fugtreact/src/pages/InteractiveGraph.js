import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function InteractiveGraph({ graphUrl }) {
    const [graphHtml, setGraphHtml] = useState('');
    const graphContainer = useRef(null);

    useEffect(() => {
        if (graphUrl) {
            axios.get(graphUrl)
                .then(response => {
                    setGraphHtml(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors du chargement du graphique:', error);
                });
        }
    }, [graphUrl]);

    useEffect(() => {
        if (graphHtml && graphContainer.current) {
            // ⚡ Réexécute les scripts insérés dans l'HTML
            const scripts = graphContainer.current.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const script = scripts[i];
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                script.parentNode.replaceChild(newScript, script);
            }
        }
    }, [graphHtml]);

    return (
        <div className="w-full flex flex-col items-center">
            {graphHtml ? (
                <div ref={graphContainer} dangerouslySetInnerHTML={{ __html: graphHtml }} />
            ) : (
                <p>Chargement du graphique...</p>
            )}
        </div>
    );
}

export default InteractiveGraph;
