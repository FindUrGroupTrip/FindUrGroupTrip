import React, { useEffect, useState } from 'react';

const ActiviteList = () => {
    const [activites, setActivites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'http://localhost:8000' with the base URL of your Django server
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
                        <th className="py-2 px-4 border-b">lieu</th>
                        <th className="py-2 px-4 border-b">date</th>
                        {/* Add more headers for other fields */}
                    </tr>
                    </thead>
                    <tbody>
                    {activites.map((activite) => (
                        <tr key={activite.idactivite}>
                            <td className="py-2 px-4 border-b">{activite.idactivite}</td>
                            <td className="py-2 px-4 border-b">{activite.nom}</td>
                            <td className="py-2 px-4 border-b">{activite.lieu}</td>
                            <td className="py-2 px-4 border-b">{activite.date}</td>

                            {/* Add more cells for other fields */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiviteList;


