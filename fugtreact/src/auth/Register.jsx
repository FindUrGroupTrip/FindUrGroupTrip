import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerUser } from './auth-service'
import { ROUTES } from '../routes'

export function Register() {
  const [registrationRequest, setRegistrationRequest] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    setRegistrationRequest({
      ...registrationRequest,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(registrationRequest);
      navigate(ROUTES.login.path);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('Une erreur inattendue s\'est produite.');
      }
    }
  };


  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nom d'utilisateur:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={registrationRequest.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={registrationRequest.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mot de passe:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={registrationRequest.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            S'inscrire
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  )
}
