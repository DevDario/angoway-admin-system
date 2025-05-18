import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUseCase } from "../../api/usecases/login.usecase";
import { useState } from "react";
import { saveToken, removeToken } from "../../utils/secure-store";

const useAuthMutationMessages = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSuccess = (message?: string) => {
    setSuccessMessage(message || null);
    setErrorMessage(null);
  };

  const handleError = (error: any, fallback: string) => {
    setErrorMessage(error?.message || fallback);
    setSuccessMessage(null);
  };

  return { successMessage, errorMessage, handleSuccess, handleError };
};

export const useLogin = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useAuthMutationMessages();
  const mutation = useMutation({
    mutationFn: loginUseCase,
    onSuccess: (res: any) => {
      saveToken(res.data.access_token);
      queryClient.invalidateQueries();
      handleSuccess("Login realizado com sucesso.");
      onSuccess?.();
      window.location.reload();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao fazer login.");
      onError?.(error?.message || "Erro ao fazer login.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useLogout = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useAuthMutationMessages();
  const mutation = useMutation({
    mutationFn: async () => {
      removeToken();
      queryClient.clear();
    },
    onSuccess: () => {
      handleSuccess("Logout realizado com sucesso.");
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao fazer logout.");
      onError?.(error?.message || "Erro ao fazer logout.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};
