import { Stop } from "../../types/Stop";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { StopResponse } from "../../types/stop.response";

export const createStop = async (body: Stop) => {
  const token = getToken();
  const response = await api.post(
    "/stops",
    { body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getStops = async (): Promise<StopResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/stops", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getStopsFromRoute = async (
  routeId: number
): Promise<StopResponse[] | []> => {
  const token = getToken();
  const response = await api.get(`/stops/route/${routeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOneStop = async (id: number): Promise<StopResponse> => {
  const token = getToken();
  const response = await api.get(`/stops/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateStop = async (id: number, body: Stop) => {
  const token = getToken();
  const response = await api.put(
    `/routes/${id}`,
    { body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteStop = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/stops/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
