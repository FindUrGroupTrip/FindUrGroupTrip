// LeftSidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Si vous utilisez React Router
// LeftSidebar.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faList, faPlus } from '@fortawesome/free-solid-svg-icons';

import './LeftSidebar.css';

const LeftSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

// LeftSidebar.js
    return (
        <div className={`left-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="sidebar-content">
                <Link to="/creer-activite">
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faPlus} /> Créer une activité
                    </button>
                </Link>
                <Link to="/activitelist">
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faList} /> Voir les activités
                    </button>
                </Link>

            </div>
        </div>
    );

};

export default LeftSidebar;
