import { Bus } from "../../types/Bus";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { BusResponse } from "../../types/bus.response";
import { ResponseBody } from "../../types/response.body";

export const createBus = async ({
  matricula,
  capacity,
  currentLoad,
  location,
  routeId
}: Bus): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.post(
    "/bus",
    { matricula, capacity, currentLoad, location, routeId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getBuses = async (): Promise<BusResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/bus", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateBus = async (
  id: number,
  body: Bus
): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.put(
    `/bus/${id}`,
    { body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteBus = async (id: number): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.delete(`/bus/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
