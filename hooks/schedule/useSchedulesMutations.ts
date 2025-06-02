import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSchedule,
  deleteSchedule,
  updateSchedule,
  changeStatus,
} from "../../api/usecases/schedule.usecase";
import { Schedule } from "../../types/Schedule";
import { useState } from "react";

const useScheduleMutationMessages = () => {
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

export const useCreateSchedule = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useScheduleMutationMessages();
  const mutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao criar Horário.");
      onError?.(error?.message || "Erro ao criar Horário.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useUpdateSchedule = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useScheduleMutationMessages();
  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<Schedule> }) =>
      updateSchedule(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao atualizar Horário.");
      onError?.(error?.message || "Erro ao atualizar Horário.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useDeleteSchedule = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useScheduleMutationMessages();
  const mutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao remover Horário.");
      onError?.(error?.message || "Erro ao remover Horário.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};

export const useChangeScheduleStatus = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  const { successMessage, errorMessage, handleSuccess, handleError } =
    useScheduleMutationMessages();
  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: { status: string } }) =>
      changeStatus(id, body),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      handleSuccess(res.message);
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error, "Erro ao alterar status do Horário.");
      onError?.(error?.message || "Erro ao alterar status do Horário.");
    },
  });
  return { ...mutation, successMessage, errorMessage };
};
