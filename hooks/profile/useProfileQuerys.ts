import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "../../api/usecases/profile-usecase";

export const useGetProfileDetails = () =>
  useQuery({
    queryKey: ["profile-details"],
    queryFn: getProfileDetails,
    staleTime: 1000 * 60 * 5,
  });


