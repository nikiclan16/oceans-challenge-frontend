import type { LoginResponse } from "../interfaces/auth";
import api from "./api";

export const onLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
};
