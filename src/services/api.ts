import axios from 'axios';

// Get the API base URL from environment variables or use default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create an axios instance with default configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Add auth token to every request
// This runs before each request is sent to the backend
apiClient.interceptors.request.use((config) => {
  // Get the JWT token from browser's local storage
  const token = localStorage.getItem('authToken');
  
  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Handle response errors
// This runs after receiving a response from the backend
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 (Unauthorized) response, it means the token is invalid
    if (error.response?.status === 401) {
      // Clear the token and user data from storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Redirect user to home page (they'll need to login again)
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Collection of all authentication API endpoints
// These functions handle communication with the backend
export const authAPI = {
  // Send signup data to backend
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post('/auth/register', data),
  
  // Send login credentials to backend
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  
  // Get current user's profile information
  getProfile: () =>
    apiClient.get('/auth/profile'),
  
  // Logout user
  logout: () =>
    apiClient.post('/auth/logout'),
  
  // Change user's password
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    apiClient.post('/auth/change-password', data),
  
  // Request password reset via email
  forgotPassword: (data: { email: string }) =>
    apiClient.post('/auth/forgot-password', data),
  
  // Reset password using token from email
  resetPassword: (data: { token: string; newPassword: string }) =>
    apiClient.post('/auth/reset-password', data),
};
