import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from '../auth/is-authenticated'
import {
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../auth/auth-service'
import { ROUTES } from '../routes'
import Weather from '../Template/Weather' // Adjust the path accordingly

export function Header() {
  const applicationName = 'FindUrGroupTrip'
  const { isAuthenticated, isLoading, connectedUser } = useIsAuthenticated()

  const navigate = useNavigate()

  async function handelLogout() {
    await logout()
    navigate(ROUTES.login.path)
  }

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center ml-4">
              <img
                src="http://localhost:8000/static/FUGTLogo.png"
                className="h-8"
                alt="application"
              />
              <span className="ml-2 text-2xl font-semibold dark:text-white">
                {applicationName}
              </span>
            </Link>
          </div>

          <Weather></Weather>

          <div className="flex items-center">
            {isLoading && <span>Loading...</span>}
            {isAuthenticated && !isLoading && (
              <div className="flex gap-4 justify-center items-center">
                <span className="ml-4 text-gray-600 dark:text-white">
                  <FontAwesomeIcon icon={faUser} />{' '}
                  <b>{connectedUser.username}</b>
                </span>
                <button
                  type="button"
                  className="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handelLogout}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                </button>
              </div>
            )}
            {!isAuthenticated && (
              <div className="flex gap-4">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
