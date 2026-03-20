import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
export default function ProtectedRoute({ children }) {
    const token = useAuthStore((s) => s.token);
    const user = useAuthStore((s) => s.user);
    // Verifica token + usuário
    if (!token || !user) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
