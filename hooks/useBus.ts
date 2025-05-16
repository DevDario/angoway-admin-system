import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBuses,
  updateBus,
  createBus,
  deleteBus,
  getBusesCount,
  getActiveBusesCount,
  getInactiveBusesCount,
  getPendingBusesCount,
  getBusesWithAssignedRoutes,
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

  const useGetBusesCount = useQuery({
    queryKey: ["buses-count"],
    queryFn: getBusesCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetActiveBusesCount = useQuery({
    queryKey: ["active-buses"],
    queryFn: getActiveBusesCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetInactiveBusesCount = useQuery({
    queryKey: ["inactive-buses"],
    queryFn: getInactiveBusesCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetPendingBusesCount = useQuery({
    queryKey: ["pending-buses"],
    queryFn: getPendingBusesCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetBusesWithAssignedRoutes = useQuery({
    queryKey: ["route-assigned-buses"],
    queryFn: getBusesWithAssignedRoutes,
    staleTime: 1000 * 60 * 5,
  });

  return {
    error,
    success,
    useGetBuses,
    useCreateBus,
    useUpdateBus,
    useDeleteBus,
    useGetBusesCount,
    useGetActiveBusesCount,
    useGetInactiveBusesCount,
    useGetPendingBusesCount,
    useGetBusesWithAssignedRoutes,
  };
}
