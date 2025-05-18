import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDriver,
  updateDriver,
  deleteDriver,
} from "../../api/usecases/driver.usecase";
import { Driver } from "../../types/Driver";
import { useState } from "react";

const useDriverMutationMessages = () => {
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

export const useCreateDriver = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useDriverMutationMessages();
  const mutation = useMutation({
    mutationFn: createDriver,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao criar motorista.");
      onError?.(error?.message || "Erro ao criar motorista.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useUpdateDriver = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useDriverMutationMessages();
  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Driver }) =>
      updateDriver(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar motorista.");
      onError?.(error?.message || "Erro ao atualizar motorista.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useDeleteDriver = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useDriverMutationMessages();
  const mutation = useMutation({
    mutationFn: deleteDriver,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao remover motorista.");
      onError?.(error?.message || "Erro ao remover motorista.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};
