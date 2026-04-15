import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Type definition for login form data
interface LoginPayload {
  email: string;
  password: string;
}

// Type definition for successful login response from backend
interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

// Type definition for error messages from backend
interface ErrorResponse {
  message: string;
}

// Custom hook for handling user login
// Returns functions and states to manage the login process
export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginPayload
  >({
    mutationFn: (data: LoginPayload) => {
      return authAPI.login(data).then((res) => res.data);
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      if (data.user.role === 'admin') {
        navigate('/admin');
      }
    },
  });
};
