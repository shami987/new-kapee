import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

interface ForgotPasswordPayload {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ErrorResponse {
  message: string;
}

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordResponse,
    AxiosError<ErrorResponse>,
    ForgotPasswordPayload
  >({
    mutationFn: (data: ForgotPasswordPayload) => {
      return authAPI.forgotPassword(data).then((res) => res.data);
    },
  });
};