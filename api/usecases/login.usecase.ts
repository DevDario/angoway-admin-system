import { api } from "../axios-instance";
import { z } from "zod";
import { loginSchema } from "../../schemas/login.schema";

type LoginUseCaseProps = z.infer<typeof loginSchema>;

export const loginUseCase = async ({ number, password }: LoginUseCaseProps) => {
  const response = api.post("/auth/login", {
    number,
    password,
  });

  return (await response).data;
};
