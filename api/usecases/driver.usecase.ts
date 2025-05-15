import { Driver } from "../../types/Driver";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { DriverResponse } from "../../types/driver.response";

export const createDriver = async (body: Driver) => {
  const token = getToken();
  const response = await api.post(
    "/driver",
    { body },
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
  const response = await api.get("/driver", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateDriver = async (id: number, body: Driver) => {
  const token = getToken();
  const response = await api.put(
    `/driver/${id}`,
    { body },
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
