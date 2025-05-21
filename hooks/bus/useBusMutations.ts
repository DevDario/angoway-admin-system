import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBus,
  updateBus,
  deleteBus,
  assignDriver,
} from "../../api/usecases/bus.usecase";
import { Bus } from "../../types/Bus";
import { useState } from "react";

const useBusMutationMessages = () => {
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

export const useCreateBus = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useBusMutationMessages();
  const mutation = useMutation({
    mutationFn: createBus,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao criar Autocarro.");
      onError?.(error?.message || "Erro ao criar Autocarro.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useUpdateBus = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useBusMutationMessages();
  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Bus }) =>
      updateBus(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar autocarro.");
      onError?.(error?.message || "Erro ao atualizar autocarro.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useDeleteBus = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useBusMutationMessages();
  const mutation = useMutation({
    mutationFn: deleteBus,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao remover autocarro.");
      onError?.(error?.message || "Erro ao remover autocarro.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useAssignDriver = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useBusMutationMessages();
  const mutation = useMutation({
    mutationFn: ({ busId, email }: { busId: number; email: string }) =>
      assignDriver(busId, email),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atribuir Motorista.");
      onError?.(error?.message || "Erro ao atribuir Motorista.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};
