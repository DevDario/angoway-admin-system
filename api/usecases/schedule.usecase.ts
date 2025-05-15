import { Schedule } from "../../types/Schedule";
import { api } from "../axios-instance";
import { getToken } from "../../utils/secure-store";
import { ScheduleResponse } from "../../types/schedule.response";

export const createSchedule = async (body: Schedule) => {
  const token = getToken();
  const response = await api.post(
    "/schedules",
    { body },
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

export const updateSchedule = async (id: number) => {
  const token = getToken();
  const response = await api.patch(`/schedules/${id}`, {
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
