import { useQuery } from "@tanstack/react-query";
import {
  getBuses,
  getBusesCount,
  getActiveBusesCount,
  getInactiveBusesCount,
  getPendingBusesCount,
  getBusesWithAssignedRoutes,
  getBusById
} from "../../api/usecases/bus.usecase";

export const useGetBuses = () =>
  useQuery({
    queryKey: ["buses"],
    queryFn: getBuses,
    staleTime: 1000 * 60 * 5,
  });

export const useGetBusesCount = () =>
  useQuery({
    queryKey: ["buses-count"],
    queryFn: getBusesCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetActiveBusesCount = () =>
  useQuery({
    queryKey: ["active-buses"],
    queryFn: getActiveBusesCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetInactiveBusesCount = () =>
  useQuery({
    queryKey: ["inactive-buses"],
    queryFn: getInactiveBusesCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetPendingBusesCount = () =>
  useQuery({
    queryKey: ["pending-buses"],
    queryFn: getPendingBusesCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetBusesWithAssignedRoutes = () =>
  useQuery({
    queryKey: ["buses-with-assigned-routes"],
    queryFn: getBusesWithAssignedRoutes,
    staleTime: 1000 * 60 * 5,
  });

  export const useGetBusById = (id: number) =>
    useQuery({
      queryKey: ["buses", id],
      queryFn: () => getBusById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });
