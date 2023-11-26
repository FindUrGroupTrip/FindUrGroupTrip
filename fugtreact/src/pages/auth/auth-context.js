import React, { createContext, useContext } from 'react'
import useIsAuthenticated from './is-authenticated' // Assurez-vous que le chemin est correct

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, isLoading } = useIsAuthenticated()

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
