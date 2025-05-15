import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBuses,
  updateBus,
  createBus,
  deleteBus,
} from "../api/usecases/bus.usecase";
import { useState } from "react";
import { Bus } from "../types/Bus";

export function useBus() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const useGetBuses = useQuery({
    queryKey: ["buses"],
    queryFn: getBuses,
      staleTime: 1000 * 60 * 5,
  });

  const useUpdateBus = useMutation({
    mutationFn: async () => updateBus,
    onMutate: () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  const useCreateBus = useMutation({
    mutationFn: createBus,
    onMutate: () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  const useDeleteBus = useMutation({
    mutationFn: deleteBus,
    onMutate: () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  return {
    error,
    success,
    useGetBuses,
    useCreateBus,
    useUpdateBus,
    useDeleteBus,
  };
}
