// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './pages/Header';
import { Activitelist } from './pages/activitelist';
import ActiviteList from './pages/activitelist'; // Import your ActiviteListOLD component
import CreerActivite from './Template/CreerActivite';
import LeftSidebar from './LeftSideBar';
import SingleActivite from "./Template/SingleActivite";
import ReservationPage from './Template/reservation/ReservationPage';
import './App.scss'
import { Sidebar } from './layout/Sidebar'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import { Register } from './pages/auth/Register'
import { ProtectedRoute } from './pages/auth/ProtectedRoute'
import './pages/auth/axios-interceptor'
import HomePage from './pages/HomePage'
import { AuthProvider } from './pages/auth/auth-context'
import ImageComponent from './Template/ImageComponent'
import ReservationForm from "./Template/reservation/ReservationForm";

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
                        <Route path="/reservation-form/:idactivite" element={<ReservationPage />} />

                        {/* Add more routes as needed */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
