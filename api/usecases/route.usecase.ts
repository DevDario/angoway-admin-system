import { Route } from "../../types/Route";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { RouteResponse } from "../../types/route.response";

export const createRoute = async (body: Route) => {
  const token = getToken();
  const response = await api.post(
    "/routes",
    { body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getRoutes = async (): Promise<RouteResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/routes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOneRoute = async (id: number):Promise<RouteResponse> => {
  const token = getToken();
  const response = await api.get(`/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateRoute = async (id: number, body: Route) => {
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

export const updateRouteStatus = async (id: number) => {
  const token = getToken();
  const response = await api.patch(
    `/routes/updateStatus/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteRoute = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
