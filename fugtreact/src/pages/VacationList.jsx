// fugtreact/src/pages/VacationList.jsx
import React, { useState } from 'react';

const VacationList = () => {
    const [monuments, setMonuments] = useState([
        // initialiser cette liste avec les monuments existants
        { id: 1, name: 'Monument 1', checked: false },
        { id: 2, name: 'Monument 2', checked: false },
        // ...
    ]);

    const handleToggle = (id) => {
        setMonuments((prevMonuments) =>
            prevMonuments.map((monument) =>
                monument.id === id ? { ...monument, checked: !monument.checked } : monument
            )
        );
    };

    return (
        <div>
            <h2>To-Do List Vacances</h2>
            <ul>
                {monuments.map((monument) => (
                    <li key={monument.id}>
                        <input
                            type="checkbox"
                            checked={monument.checked}
                            onChange={() => handleToggle(monument.id)}
                        />
                        {monument.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VacationList;
