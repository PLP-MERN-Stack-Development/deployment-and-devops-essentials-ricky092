// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  BASE_URL: API_URL,
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
    LOGOUT: `${API_URL}/api/auth/logout`,
    ME: `${API_URL}/api/auth/me`
  },
  USERS: {
    GET_ALL: `${API_URL}/api/users`,
    GET_ONE: (id) => `${API_URL}/api/users/${id}`,
    UPDATE: (id) => `${API_URL}/api/users/${id}`,
    DELETE: (id) => `${API_URL}/api/users/${id}`
  },
  HEALTH: `${API_URL}/health`
};

export default API_URL;
