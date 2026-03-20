import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { useAuthStore } from "../store/authStore";
export default function NavbarAuthButtons() {
    const [open, setOpen] = useState(false);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    if (user) {
        return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-white/90", children: ["Ol\u00E1, ", user.name] }), _jsx("button", { onClick: logout, className: "rounded-full bg-white/20 px-3 py-2 text-white", children: "Sair" })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setOpen(true), className: "rounded-full bg-white/20 px-4 py-2 text-white", children: "Entrar" }), _jsx(AuthModal, { open: open, onClose: () => setOpen(false) })] }));
}
