import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import useIsAuthenticated from './is-authenticated'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useIsAuthenticated()

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login.path} />
  }

  return children
}
