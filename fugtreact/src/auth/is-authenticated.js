import { useEffect, useState } from 'react'
import { fetchConnectedUser } from './auth-service'
import { USER_TOKEN_KEY } from './auth-consts'
import { useLocation } from 'react-router-dom'

export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [connectedUser, setConnectedUser] = useState(null)
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
        const connectedUser = await fetchConnectedUser()
        setIsAuthenticated(true)
        setConnectedUser(connectedUser)
      } catch (error) {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth().then((_) => _)
  }, [location])

  return { isAuthenticated, isLoading, connectedUser }
}

export default useIsAuthenticated
