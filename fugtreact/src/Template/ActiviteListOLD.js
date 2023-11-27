import React, { useEffect, useState } from 'react';

const ActiviteListOLD = () => {
    const [activites, setActivites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/activites/');
                const data = await response.json();
                setActivites(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-4">Activities List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Lieu</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activites.map((activite) => (
                        <tr key={activite.idactivite}>
                            <td className="py-2 px-4 border-b">{activite.idactivite}</td>
                            <td className="py-2 px-4 border-b">{activite.nom}</td>
                            <td className="py-2 px-4 border-b">{activite.lieu}</td>
                            <td className="py-2 px-4 border-b">{activite.date}</td>
                            <td className="py-2 px-4 border-b">
                                {/* Bouton sans lien */}
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    No Link
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiviteListOLD;






