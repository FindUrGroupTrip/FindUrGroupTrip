import React from 'react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from '../auth/is-authenticated'; // Adjust the path accordingly

export function Header() {
  const applicationName = 'FindUrGroupTrip';
  const { isAuthenticated, isLoading, username } = useIsAuthenticated();

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

            <div className="flex items-center">
              {isLoading && <span>Loading...</span>}
              {isAuthenticated && !isLoading && (
                  <span className="ml-4 text-gray-600 dark:text-white">
                Connected as {username}
              </span>
              )}
            </div>
          </div>
        </nav>
      </header>
  );
}
