export type UserRole = "admin" | "mesero";

export interface User {
  id: number;
  username: string;
  role: UserRole;
}
