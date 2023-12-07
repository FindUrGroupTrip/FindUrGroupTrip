import axios from 'axios'
import { USER_TOKEN_KEY } from './auth-consts'

// Ajouter un intercepteur de requête
axios.interceptors.request.use(
  (config) => {
    // Récupérer le token d'authentification du stockage local
    const token = localStorage.getItem(USER_TOKEN_KEY)

    // Si le token existe, l'ajouter à l'en-tête de la requête
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  },
  (error) => {
    // Gérer les erreurs de la requête
    return Promise.reject(error)
  }
)
