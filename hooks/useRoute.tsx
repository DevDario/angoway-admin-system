import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRoute,
  deleteRoute,
  getActiveRoutesCount,
  getInactiveRoutesCount,
  getOneRoute,
  getRoutes,
  getRoutesCount,
  updateRoute,
  updateRouteStatus,
} from "../api/usecases/route.usecase";
import { useState } from "react";

export function useRoute() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const useGetRoutes = useQuery({
    queryKey: ["drivers"],
    queryFn: getRoutes,
    staleTime: 1000 * 60 * 5,
  });

  const useGetOneRoute = (id: number) =>
    useQuery({
      queryKey: ["route", id],
      queryFn: () => getOneRoute(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });

  const useUpdateRouteStatus = useMutation({
    mutationFn: updateRouteStatus,
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

  const useUpdateRoute = useMutation({
    mutationFn: async () => updateRoute,
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

  const useCreateRoute = useMutation({
    mutationFn: createRoute,
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

  const useDeleteRoute = useMutation({
    mutationFn: deleteRoute,
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

  const useGetRoutesCount = useQuery({
    queryKey: ["routes-count"],
    queryFn: getRoutesCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetActiveRoutesCount = useQuery({
    queryKey: ["active-routes"],
    queryFn: getActiveRoutesCount,
    staleTime: 1000 * 60 * 5,
  });

  const useGetInactiveDriversCount = useQuery({
    queryKey: ["inactive-routes"],
    queryFn: getInactiveRoutesCount,
    staleTime: 1000 * 60 * 5,
  });

  return {
    error,
    success,
    useGetRoutes,
    useUpdateRoute,
    useCreateRoute,
    useDeleteRoute,
    useGetRoutesCount,
    useGetActiveRoutesCount,
    useGetInactiveDriversCount,
    useGetOneRoute,
    useUpdateRouteStatus,
  };
}
