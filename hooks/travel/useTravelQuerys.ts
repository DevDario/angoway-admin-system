import { useQuery } from "@tanstack/react-query";
import {
  getTravels,
  getTravelById,
  getMonthlyTravelCount,
  getWeeklyTravelProfit,
} from "../../api/usecases/travel.usecase";

export const useGetTravels = () =>
  useQuery({
    queryKey: ["travels"],
    queryFn: getTravels,
    staleTime: 1000 * 60 * 5,
  });

export const useGetTravelById = (id: number) =>
  useQuery({
    queryKey: ["travel", id],
    queryFn: () => getTravelById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useGetMonthlyTravelCount = () =>
  useQuery({
    queryKey: ["travels-count"],
    queryFn: getMonthlyTravelCount,
    staleTime: 1000 * 60 * 5,
  });


  export const useGetWeeklyEarningsCount = () =>
    useQuery({
      queryKey: ["weekly-earnings"],
      queryFn: getWeeklyTravelProfit,
      staleTime: 1000 * 60 * 5,
    });
  