import { useState, useEffect } from 'react'
import { verifyToken } from './auth-service'
import { USER_TOKEN_KEY } from './auth-consts'
import { useLocation } from 'react-router-dom'

export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem(USER_TOKEN_KEY)

    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      try {
        const result = await verifyToken(token)
        setIsAuthenticated(result)
      } catch (error) {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth().then((_) => _)
  }, [location])

  return { isAuthenticated, isLoading }
}

export default useIsAuthenticated
