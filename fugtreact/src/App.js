// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './layout/header/Header';
import { Activitelist } from './pages/activitelist';
import ActiviteList from './pages/activitelist'; // Import your ActiviteListOLD component
import CreerActivite from './Template/CreerActivite'; // Import your CreerActivite component
import LeftSidebar from './LeftSideBar';
import SingleActivite from "./Template/SingleActivite";
import ReservationPage from './Template/reservation/ReservationPage';
import React from 'react'
import { Header } from './layout/header/Header'
import './App.scss'
import { Sidebar } from './layout/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ProtectedRoute } from './pages/auth/ProtectedRoute'
import './pages/auth/axios-interceptor'
import HomePage from './pages/HomePage'
import { AuthProvider } from './pages/auth/auth-context'

function App() {
    return (
        <Router>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                <Header />
                <LeftSidebar />
                <main className="p-4 md:ml-64 h-auto pt-20">
                    <Routes>
                        {/*<Route path="/activite" element={<ActiviteListOLD />} />*/}
                        <Route path="/activitelist" element={<Activitelist />} />
                        <Route path="/activites/:idactivite" element={<SingleActivite />} />
                        <Route path="/creer-activite" element={<CreerActivite />} />
                        <Route path="/activite/:idactivite/reservation" element={<ReservationPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
  return (
    <Router>
      <AuthProvider>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
          <Header></Header>
          <Sidebar></Sidebar>
          <main className="p-4 md:ml-64 h-auto pt-20">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
