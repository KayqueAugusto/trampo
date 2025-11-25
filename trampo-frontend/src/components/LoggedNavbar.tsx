import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface LoggedNavbarProps {
  active?: "inicio" | "anuncio" | "mensagens" | "perfil";
}

const LoggedNavbar: React.FC<LoggedNavbarProps> = ({
  active = "inicio",
}) => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    logout();
    navigate("/");
  }

  const baseMenu =
    "text-sm font-medium pb-1 border-b-2 border-transparent hover:border-slate-300 hover:text-slate-900 transition-colors";
  const activeMenu = "text-[#ff7a00] border-[#ff7a00]";

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/app" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ff7a00] flex items-center justify-center text-white font-bold text-lg">
            ✓
          </div>
          <span className="font-semibold text-slate-900 text-lg">Trampo</span>
        </Link>

        {/* Menu central */}
        <nav className="flex items-center gap-6">
          <Link
            to="/app"
            className={`${baseMenu} ${
              active === "inicio" ? activeMenu : "text-slate-600"
            }`}
          >
            INICIO
          </Link>

          <Link
            to="/app/anuncio"
            className={`${baseMenu} ${
              active === "anuncio" ? activeMenu : "text-slate-600"
            }`}
          >
            ANUNCIO
          </Link>

          <Link
            to="/app/mensagens"
            className={`${baseMenu} ${
              active === "mensagens" ? activeMenu : "text-slate-600"
            }`}
          >
            MENSAGENS
          </Link>

          <Link
            to="/app/perfil"
            className={`${baseMenu} ${
              active === "perfil" ? activeMenu : "text-slate-600"
            }`}
          >
            PERFIL
          </Link>
        </nav>

        {/* Lado direito */}
        <div className="flex items-center gap-4">
          {/* Toggle visual */}
          <div className="w-11 h-6 rounded-full bg-slate-300 flex items-center px-1">
            <div className="w-4 h-4 rounded-full bg-white translate-x-4 shadow-sm" />
          </div>

          {/* Publicar anúncio */}
          <Link
            to="/app/anuncio"
            className="px-4 py-2 rounded-full bg-[#ff7a00] text-white text-sm font-semibold shadow-sm hover:bg-[#e56d00] transition-colors inline-flex items-center justify-center"
          >
            Publicar Anúncio
          </Link>

          {/* SAIR */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            ⏻ <span>SAIR</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default LoggedNavbar;
