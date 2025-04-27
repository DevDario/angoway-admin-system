import { api } from "../axios-instance";

export const loginUseCase = async ({ number, password }) => {
  const response = api.post("/auth/login", {
    number,
    password,
  });

  return response;
};
