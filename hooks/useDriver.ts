import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDrivers,
  createDriver,
  deleteDriver,
  updateDriver,
  getDriversWithAssignedBus,
  getDriversCount,
  getActiveDriversCount,
  getInactiveDriversCount,
  getPendingDriversCount,
} from "../api/usecases/driver.usecase";
import { useState } from "react";

export function useDriver() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const useGetDrivers = useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
    staleTime: 1000 * 60 * 5,
  });

  const useUpdateDriver = useMutation({
    mutationFn: async () => updateDriver,
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

  const useCreateDriver = useMutation({
    mutationFn: createDriver,
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

  const useDeleteDriver = useMutation({
    mutationFn: deleteDriver,
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

  const useGetDriversWithAssignedBus = useQuery({
      queryKey: ["bus-assigned-drivers"],
      queryFn: getDriversWithAssignedBus,
      staleTime: 1000 * 60 * 5,
  });
  
  const useGetDriversCount = useQuery({
      queryKey: ["drivers-count"],
      queryFn: getDriversCount,
      staleTime: 1000 * 60 * 5,
    });
  
    const useGetActiveDriversCount = useQuery({
      queryKey: ["active-drivers"],
      queryFn: getActiveDriversCount,
      staleTime: 1000 * 60 * 5,
    });
  
    const useGetInactiveDriversCount = useQuery({
      queryKey: ["inactive-drivers"],
      queryFn: getInactiveDriversCount,
      staleTime: 1000 * 60 * 5,
    });
  
    const useGetPendingDriversCount = useQuery({
      queryKey: ["pending-drivers"],
      queryFn: getPendingDriversCount,
      staleTime: 1000 * 60 * 5,
    });

  return {
    error,
    success,
    useGetDrivers,
    useCreateDriver,
    useUpdateDriver,
    useDeleteDriver,
    useGetDriversWithAssignedBus,
    useGetDriversCount,
    useGetActiveDriversCount,
    useGetInactiveDriversCount,
    useGetPendingDriversCount,
  };
}
