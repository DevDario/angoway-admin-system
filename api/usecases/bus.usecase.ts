import { Bus } from "../../types/Bus";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { BusResponse } from "../../types/bus.response";
import { ResponseBody } from "../../types/response.body";
import { CountBusResponse } from "../../types/count.bus.response";
import { BusesWithAssignedRoutesResponse } from "../../types/buses-with-assigned-routes.response";

export const createBus = async ({
  matricula,
  capacity,
  currentLoad,
  routeId
}: Bus): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.post(
    "/bus",
    { matricula, capacity, currentLoad, routeId },
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

export const getBusesCount = async (): Promise<CountBusResponse> => {
  const token = getToken();
  const response = await api.get("/bus/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountBusResponse;
};

export const getActiveBusesCount = async (): Promise<CountBusResponse> => {
  const token = getToken();
  const response = await api.get("/bus/count-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountBusResponse;
};

export const getInactiveBusesCount = async (): Promise<CountBusResponse> => {
  const token = getToken();
  const response = await api.get("/bus/count-inactive", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountBusResponse;
};

export const getPendingBusesCount = async (): Promise<CountBusResponse> => {
  const token = getToken();
  const response = await api.get("/bus/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountBusResponse;
};

export const getBusesWithAssignedRoutes = async (): Promise<BusesWithAssignedRoutesResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/bus/with-route", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as BusesWithAssignedRoutesResponse[];
};

export const updateBus = async (
  id: number,
  body: Partial<Bus>
): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.patch(
    `/bus/update/${id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getBusById = async (
  id: number,
): Promise<BusResponse> => {
  const token = getToken();
  const response = await api.get(`/bus/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export const assignDriver = async (
  busId: number,
  driverEmail: string
): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.put(`/bus/assign-driver/${busId}`, {driverEmail}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changeStatus = async (
  driverId: number,
  body: { status: string }
): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.patch(
    `/bus/status/${driverId}`, body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};