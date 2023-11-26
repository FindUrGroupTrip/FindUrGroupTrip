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
