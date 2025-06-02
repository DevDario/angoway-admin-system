import { Schedule } from "../../types/Schedule";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { ScheduleResponse } from "../../types/schedule.response";
import { ResponseBody } from "../../types/response.body";

export const createSchedule = async ({departureLocation,departureTime,arrivalLocation,arrivalTime,status,distanceKM,estimatedDurationMinutes,routeId}: Partial<Schedule>) => {
  const token = getToken();
  const response = await api.post(
    "/schedules",
    {
      departureLocation,
      departureTime,
      arrivalTime,
      arrivalLocation,
      status,
      distanceKM,
      estimatedDurationMinutes,
      routeId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSchedules = async (): Promise<ScheduleResponse[] | []> => {
  const token = getToken();
  const response = await api.get("/schedules", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateSchedule = async (id: number, body: Partial<Schedule>) => {
  const token = getToken();
  const response = await api.patch(`/schedules/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changeStatus = async (
  id: number,
  body: { status: string }
): Promise<ResponseBody> => {
  const token = getToken();
  const response = await api.patch(`/schedules/status/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteSchedule = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/schedules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
