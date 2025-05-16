import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTravel,
  deleteTravel,
  getMonthlyTravelCount,
  getTravelById,
  getTravels,
  updateTravel,
} from "../api/usecases/travel.usecase";
import { useState } from "react";

export function useTravel() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const useGetTravels = useQuery({
    queryKey: ["travels"],
    queryFn: getTravels,
    staleTime: 1000 * 60 * 5,
  });

  const useUpdateTravels = useMutation({
    mutationFn: async () => updateTravel,
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

  const useCreateTravel = useMutation({
    mutationFn: createTravel,
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

  const useDeleteTravel = useMutation({
    mutationFn: deleteTravel,
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

  const useGetMonthlyTravelCount = useQuery({
    queryKey: ["travels-profit"],
    queryFn: getMonthlyTravelCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetTravelById = (id: number) =>
    useQuery({
      queryKey: ["travel", id],
      queryFn: () => getTravelById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });

  return {
    error,
    success,
    useGetTravels,
    useUpdateTravels,
    useCreateTravel,
    useDeleteTravel,
    useGetMonthlyTravelCount,
    useGetTravelById,
    setError,
    setSuccess,
  };
}
