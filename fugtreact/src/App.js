// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './pages/Header';
import ContactForm from './pages/ContactForm';
import ContactRequests from './pages/ContactRequest';
import { Activitelist } from './pages/activitelist';
import ActiviteList from './pages/activitelist'; // Import your ActiviteListOLD component
import CreerActivite from './Template/CreerActivite';
import LeftSidebar from './LeftSideBar';
import SingleActivite from "./Template/SingleActivite";
import ReservationPage from './Template/reservation/ReservationPage';
import './App.scss'
import Login from './auth/Login'
import { Register } from './auth/Register'
import { ProtectedRoute } from './auth/ProtectedRoute'
import './auth/axios-interceptor'
import ImageComponent from './Template/ImageComponent'

import VacationList from "./Template/VacationList"; // Import your new VacationList component
import Forum from './forum/Forum';


function App() {
    return (
        <Router>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                <Header />
                <LeftSidebar />
                <main className="p-4 md:ml-64 h-auto pt-20">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <CreerActivite />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/image" element={<ImageComponent />} />
                        <Route path="/activitelist" element={<Activitelist />} />
                        <Route path="/activites/:idactivite" element={<SingleActivite />} />
                        <Route path="/creer-activite" element={<CreerActivite />} />
                        <Route path="/vacationlist" element={<VacationList />} />
                        <Route path="/contact" element={<ContactForm />} />
                        <Route path="/reservation-form/:idactivite" element={<ReservationPage />} />
                        <Route path="/contact-request" element={<ContactRequests />} />

                        <Route path="/forum" element={<Forum />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
