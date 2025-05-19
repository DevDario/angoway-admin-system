import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRoute,
  updateRoute,
  deleteRoute,
  updateRouteStatus,
} from "../../api/usecases/route.usecase";
import { Route } from "../../types/Route";
import { useState } from "react";

const useRouteMutationMessages = () => {
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

export const useCreateRoute = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useRouteMutationMessages();

  const mutation = useMutation({
    mutationFn: createRoute,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao criar rota.");
      onError?.(error?.message || "Erro ao criar rota.");
    },
  });

  return { ...mutation, successMessage, errorMessage };
};

export const useUpdateRoute = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useRouteMutationMessages();

  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Route }) =>
      updateRoute(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      handleSuccess(res?.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar rota.");
      onError?.(error?.message || "Erro ao atualizar rota.");
    },
  });

  return { ...mutation, successMessage, errorMessage };
};

export const useDeleteRoute = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useRouteMutationMessages();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteRoute(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      handleSuccess(res?.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao deletar rota.");
      onError?.(error?.message || "Erro ao deletar rota.");
    },
  });

  return { ...mutation, successMessage, errorMessage };
};

export const useUpdateRouteStatus = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useRouteMutationMessages();

  const mutation = useMutation({
    mutationFn: (id: number) => updateRouteStatus(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      handleSuccess(res?.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar status da rota.");
      onError?.(error?.message || "Erro ao atualizar status da rota.");
    },
  });

  return { ...mutation, successMessage, errorMessage };
};
