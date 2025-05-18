import { useQuery } from "@tanstack/react-query";
import {
  getRoutes,
  getPreviewRoutes,
  getOneRoute,
  getRoutesCount,
  getActiveRoutesCount,
  getInactiveRoutesCount,
} from "../../api/usecases/route.usecase";

export const useGetRoutes = () =>
  useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
    staleTime: 1000 * 60 * 5,
  });

export const useGetPreviewRoutes = () =>
  useQuery({
    queryKey: ["preview-routes"],
    queryFn: getPreviewRoutes,
    staleTime: 1000 * 60 * 5,
  });

export const useGetOneRoute = (id: number) =>
  useQuery({
    queryKey: ["route", id],
    queryFn: () => getOneRoute(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useGetRoutesCount = () =>
  useQuery({
    queryKey: ["routes-count"],
    queryFn: getRoutesCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetActiveRoutesCount = () =>
  useQuery({
    queryKey: ["active-routes-count"],
    queryFn: getActiveRoutesCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetInactiveRoutesCount = () =>
  useQuery({
    queryKey: ["inactive-routes-count"],
    queryFn: getInactiveRoutesCount,
    staleTime: 1000 * 60 * 5,
  });
