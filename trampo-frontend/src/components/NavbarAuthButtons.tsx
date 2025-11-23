import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { useAuthStore } from "../store/authStore";

export default function NavbarAuthButtons() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-white/90">Olá, {user.name}</span>
        <button onClick={logout} className="rounded-full bg-white/20 px-3 py-2 text-white">
          Sair
        </button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-full bg-white/20 px-4 py-2 text-white">
        Entrar
      </button>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
