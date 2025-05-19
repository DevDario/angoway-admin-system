import { Travel } from "../../types/Travel";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { TravelResponse } from "../../types/travel.response";
import { CountMonthlyResponse } from "../../types/count-monthly.response";

export const createTravel = async (body: Travel) => {
  const token = getToken();
  const response = await api.post("/travel", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTravels = async (): Promise<TravelResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/travel", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTravelById = async (id: number): Promise<TravelResponse> => {
  const token = getToken();
  const response = await api.get(`/travel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTravel = async (id: number, body: Travel) => {
  const token = getToken();
  const response = await api.patch(`/travel/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTravel = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/travel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMonthlyTravelCount =
  async (): Promise<CountMonthlyResponse[]> => {
    const token = getToken();
    const response = await api.get("/travel/monthly-count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as CountMonthlyResponse[];
  };
