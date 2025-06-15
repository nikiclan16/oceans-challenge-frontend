import api from "./api";

interface NewUser {
  username: string;
  password: string;
  role: "admin" | "mesero";
}

export const registerUser = async (user: NewUser): Promise<NewUser> => {
  const res = await api.post("/users/register", user);
  return res.data;
};
