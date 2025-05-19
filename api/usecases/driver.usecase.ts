import { Driver } from "../../types/Driver";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { DriverResponse } from "../../types/driver.response";
import { DriversWithAssignedBusResponse } from "../../types/drivers-with-assigned-bus.response";
import { CountDriverResponse } from "../../types/count.driver.response";
import { ResponseBody } from "../../types/response.body";

export const createDriver = async ({name, email,experienceTime, licenseNumber, password, phone}: Driver) => {
  const token = getToken();
  const response = await api.post(
    "/driver",
    { name, email, experienceTime, licenseNumber, password, phone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDrivers = async (): Promise<DriverResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/driver/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as DriverResponse[];
};

export const getRecentDrivers = async (): Promise<DriverResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/driver/recent", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as DriverResponse[];
};

export const updateDriver = async (id: number, body: Driver) => {
  const token = getToken();
  const response = await api.put(
    `/driver/${id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteDriver = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/driver/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const getDriversWithAssignedBus = async (): Promise<DriversWithAssignedBusResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/driver/bus-assigned", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as DriversWithAssignedBusResponse[];
};

export const getDriversCount = async (): Promise<CountDriverResponse> => {
  const token = getToken();
  const response = await api.get("/driver/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountDriverResponse;
};

export const getActiveDriversCount = async (): Promise<CountDriverResponse> => {
  const token = getToken();
  const response = await api.get("/driver/count-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountDriverResponse;
};

export const getInactiveDriversCount = async (): Promise<CountDriverResponse> => {
  const token = getToken();
  const response = await api.get("/driver/count-inactive", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountDriverResponse;
};

export const getPendingDriversCount = async (): Promise<CountDriverResponse> => {
  const token = getToken();
  const response = await api.get("/driver/count-pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountDriverResponse;
};

export const assignBus = async (
  id: number,
  busNia: string
): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.post(`/driver/assign-bus/${id}`, {busNia}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};