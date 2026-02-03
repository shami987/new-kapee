import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  message: string;
}

interface ErrorResponse {
  message: string;
}

export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse,
    AxiosError<ErrorResponse>,
    ResetPasswordPayload
  >({
    mutationFn: (data: ResetPasswordPayload) => {
      return authAPI.resetPassword(data).then((res) => res.data);
    },
  });
};