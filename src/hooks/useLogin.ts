import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

// Type definition for login form data
interface LoginPayload {
  email: string;
  password: string;
}

// Type definition for successful login response from backend
interface LoginResponse {
  message: string;
  token: string; // JWT token for authentication
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Type definition for error messages from backend
interface ErrorResponse {
  message: string;
}

// Custom hook for handling user login
// Returns functions and states to manage the login process
export const useLogin = () => {
  return useMutation<
    LoginResponse,         // Type of successful response
    AxiosError<ErrorResponse>,  // Type of error response
    LoginPayload           // Type of data being sent
  >({
    // The actual function that sends login credentials to backend
    mutationFn: (data: LoginPayload) => {
      return authAPI.login(data).then((res) => res.data);
    },
    // What to do after successful login
    onSuccess: (data) => {
      // Store the JWT token in browser's local storage
      // This token will be used for future authenticated requests
      localStorage.setItem('authToken', data.token);
      
      // Store the user information in local storage
      // Can be used to display user name, email, etc. in the app
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};
