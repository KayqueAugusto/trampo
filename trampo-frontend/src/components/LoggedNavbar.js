import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
const LoggedNavbar = ({ active = "inicio", }) => {
    const navigate = useNavigate();
    const logout = useAuthStore((s) => s.logout);
    function handleLogout() {
        logout();
        navigate("/");
    }
    const baseMenu = "text-sm font-medium pb-1 border-b-2 border-transparent hover:border-slate-300 hover:text-slate-900 transition-colors";
    const activeMenu = "text-[#ff7a00] border-[#ff7a00]";
    return (_jsx("header", { className: "bg-white border-b border-slate-200", children: _jsxs("div", { className: "max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-6", children: [_jsxs(Link, { to: "/app", className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[#ff7a00] flex items-center justify-center text-white font-bold text-lg", children: "\u2713" }), _jsx("span", { className: "font-semibold text-slate-900 text-lg", children: "Trampo" })] }), _jsxs("nav", { className: "flex items-center gap-6", children: [_jsx(Link, { to: "/app", className: `${baseMenu} ${active === "inicio" ? activeMenu : "text-slate-600"}`, children: "INICIO" }), _jsx(Link, { to: "/app/anuncio", className: `${baseMenu} ${active === "anuncio" ? activeMenu : "text-slate-600"}`, children: "ANUNCIO" }), _jsx(Link, { to: "/app/mensagens", className: `${baseMenu} ${active === "mensagens" ? activeMenu : "text-slate-600"}`, children: "MENSAGENS" }), _jsx(Link, { to: "/app/perfil", className: `${baseMenu} ${active === "perfil" ? activeMenu : "text-slate-600"}`, children: "PERFIL" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-11 h-6 rounded-full bg-slate-300 flex items-center px-1", children: _jsx("div", { className: "w-4 h-4 rounded-full bg-white translate-x-4 shadow-sm" }) }), _jsx(Link, { to: "/app/anuncio", className: "px-4 py-2 rounded-full bg-[#ff7a00] text-white text-sm font-semibold shadow-sm hover:bg-[#e56d00] transition-colors inline-flex items-center justify-center", children: "Publicar An\u00FAncio" }), _jsxs("button", { onClick: handleLogout, className: "flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900", children: ["\u23FB ", _jsx("span", { children: "SAIR" })] })] })] }) }));
};
export default LoggedNavbar;
