import { api } from "../lib/api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

export const authService = {
  login: (data: LoginRequest) =>
    api.post("auth/login", { json: data }).json<AuthResponse>(),

  register: (data: RegisterRequest) =>
    api.post("auth/register", { json: data }).json<{ message: string }>(),
};
