import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { ProfileDetails } from "../../types/profile-details-response";

export const getProfileDetails = async (): Promise<ProfileDetails> => {
  const token = getToken();
  const response = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as ProfileDetails;
};
