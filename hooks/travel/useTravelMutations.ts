import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTravel,
  updateTravel,
  deleteTravel,
} from "../../api/usecases/travel.usecase";
import { useState } from "react";

const useTravelMutationMessages = () => {
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

export const useCreateTravel = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useTravelMutationMessages();
  const mutation = useMutation({
    mutationFn: createTravel,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
      queryClient.invalidateQueries({ queryKey: ["travels-count"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao criar viagem.");
      onError?.(error?.message || "Erro ao criar viagem.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useUpdateTravel = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useTravelMutationMessages();
  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: any }) =>
      updateTravel(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
      queryClient.invalidateQueries({ queryKey: ["travels-count"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar viagem.");
      onError?.(error?.message || "Erro ao atualizar viagem.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useDeleteTravel = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useTravelMutationMessages();
  const mutation = useMutation({
    mutationFn: deleteTravel,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
      queryClient.invalidateQueries({ queryKey: ["travels-count"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao remover viagem.");
      onError?.(error?.message || "Erro ao remover viagem.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};
