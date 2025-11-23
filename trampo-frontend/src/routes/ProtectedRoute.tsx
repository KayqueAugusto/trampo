import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  // Verifica token + usuário
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
