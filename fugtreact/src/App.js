// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './layout/header/Header';
import { Sidebar } from './layout/Sidebar';
import { Template } from './pages/Template';
import ActiviteList from './Template/ActiviteList'; // Import your ActiviteList component
import CreerActivite from './Template/CreerActivite'; // Import your CreerActivite component

function App() {
    return (
        <Router>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                <Header />
                <Sidebar />
                <main className="p-4 md:ml-64 h-auto pt-20">
                    <Routes>
                        <Route path="/activite" element={<ActiviteList />} />
                        <Route path="/template" element={<Template />} />
                        <Route path="/creer-activite" element={<CreerActivite />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;


