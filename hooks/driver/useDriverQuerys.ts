import { useQuery } from "@tanstack/react-query";
import {
  getDrivers,
  getDriversWithAssignedBus,
  getDriversCount,
  getActiveDriversCount,
  getInactiveDriversCount,
  getPendingDriversCount,
} from "../../api/usecases/driver.usecase";

export const useGetDrivers = () =>
  useQuery({
    queryKey: ["drivers"],
    queryFn: getDrivers,
    staleTime: 1000 * 60 * 5,
  });

export const useGetDriversWithAssignedBus = () =>
  useQuery({
    queryKey: ["bus-assigned-drivers"],
    queryFn: getDriversWithAssignedBus,
    staleTime: 1000 * 60 * 5,
  });

export const useGetDriversCount = () =>
  useQuery({
    queryKey: ["drivers-count"],
    queryFn: getDriversCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetActiveDriversCount = () =>
  useQuery({
    queryKey: ["active-drivers"],
    queryFn: getActiveDriversCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetInactiveDriversCount = () =>
  useQuery({
    queryKey: ["inactive-drivers"],
    queryFn: getInactiveDriversCount,
    staleTime: 1000 * 60 * 5,
  });

export const useGetPendingDriversCount = () =>
  useQuery({
    queryKey: ["pending-drivers"],
    queryFn: getPendingDriversCount,
    staleTime: 1000 * 60 * 5,
  });
