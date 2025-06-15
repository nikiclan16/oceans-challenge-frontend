import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { name: string; role: string };
  token: string | null;
  setUser: (token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setUser: (token) => {
        localStorage.setItem("token", token);
        const { role, username } = JSON.parse(atob(token.split(".")[1]));
        return set({
          isAuthenticated: true,
          user: { role, name: username },
          token,
        });
      },
      clearSession: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
