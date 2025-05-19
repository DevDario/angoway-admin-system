import { Route } from "../../types/Route";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { RouteResponse } from "../../types/route.response";
import { CountRouteResponse } from "../../types/count.route.response";
import { RoutePreviewResponse } from "../../types/route.preview.response";

export const createRoute = async ({name, origin, destination, status}: Route) => {
  const token = getToken();
  const response = await api.post(
    "/routes",
    { name, origin, destination, status },
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

export const getPreviewRoutes = async (): Promise<RoutePreviewResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/routes/detailed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOneRoute = async (id: number): Promise<RouteResponse> => {
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
  const response = await api.patch(`/routes/updateStatus/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export const getRoutesCount = async (): Promise<CountRouteResponse> => {
  const token = getToken();
  const response = await api.get("/routes/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountRouteResponse;
};

export const getActiveRoutesCount = async (): Promise<CountRouteResponse> => {
  const token = getToken();
  const response = await api.get("/routes/count-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountRouteResponse;
};

export const getInactiveRoutesCount = async (): Promise<CountRouteResponse> => {
  const token = getToken();
  const response = await api.get("/routes/count-inactive", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as CountRouteResponse;
};
