// LeftSidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faList, faPlus, faTasks, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Ajout de l'icône d'enveloppe

import './LeftSidebar.css';

const LeftSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

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
                <Link to="/vacationlist">
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faTasks} /> Liste de vacances
                    </button>
                </Link>
                {/* Ajout du bouton pour rediriger vers /contact */}
                <Link to="/contact">
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faEnvelope} /> Contact
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LeftSidebar;
