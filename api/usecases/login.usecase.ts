import { api } from "../axios-instance";

export const loginUseCase = async ({ number, password }:{number:number, password: string}) => {
  const response = api.post("/auth/login", {
    number,
    password,
  });

  return response;
};
