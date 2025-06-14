import { useMemo } from 'react';

export function useAuth() {
  const token = localStorage.getItem('token');

  const decoded = useMemo(() => {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload; // contiene { id, username, role }
    } catch {
      return null;
    }
  }, [token]);

  return {
    isAuthenticated: !!token,
    role: decoded?.role,
    username: decoded?.username,
  };
}
