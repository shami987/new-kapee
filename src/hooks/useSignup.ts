import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

// Type definition for signup form data
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

// Type definition for successful signup response from backend
interface SignupResponse {
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

// Custom hook for handling user signup
// Returns functions and states to manage the signup process
export const useSignup = () => {
  return useMutation<
    SignupResponse,        // Type of successful response
    AxiosError<ErrorResponse>,  // Type of error response
    SignupPayload          // Type of data being sent
  >({
    // The actual function that sends signup data to backend
    mutationFn: (data: SignupPayload) => {
      return authAPI.register(data).then((res) => res.data);
    },
    // What to do after successful signup
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
