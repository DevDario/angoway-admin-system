import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../../api/usecases/schedule.usecase";

export const useGetSchedules = () =>
  useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
    staleTime: 1000 * 60 * 5,
  });
