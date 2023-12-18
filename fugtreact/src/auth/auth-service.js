import axios from 'axios'
import { API_URL, USER_TOKEN_KEY } from './auth-consts'

/**
 * User registration data.
 * @typedef {Object} RegisterRequest
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * User credentials for login.
 * @typedef {Object} Credentials
 * @property {string} username
 * @property {string} password
 */

/**
 * Login response.
 * @typedef {Object} LoginResponse
 * @property {string} token
 */

/**
 * User
 * @typedef {Object} User
 * @property {string} username
 */

/**
 * Registers a new user.
 * @param {RegisterRequest} userData - The user data.
 * @returns {Promise<Object>} The response data.
 */
export const register = async (userData) => {
  try {
    localStorage.removeItem(USER_TOKEN_KEY)
    const response = await axios.post(`${API_URL}/register`, userData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Logs in a user.
 * @param {Credentials} credentials - The user's login credentials.
 * @returns {Promise<LoginResponse>} The response data.
 */
export const login = async (credentials) => {
  try {
    localStorage.removeItem(USER_TOKEN_KEY)
    const response = await axios.post(`${API_URL}/login`, credentials)
    localStorage.setItem(USER_TOKEN_KEY, response.data.token)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Logs out the current user.
 * @returns {void}
 */
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`)
    localStorage.removeItem(USER_TOKEN_KEY)
  } catch (error) {
    throw error
  }
}

/**
 * Logs out the current user.
 * @returns {Promise<boolean>}
 */
export const verifyToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/connected`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * GET current user.
 * @returns {Promise<User>}
 */
export const fetchConnectedUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/current_user`)
    return response.data
  } catch (error) {
    throw error
  }
}
