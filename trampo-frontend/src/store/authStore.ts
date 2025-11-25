import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "freelancer" | "demandante";
};

type State = {
  token: string | null;
  user: User | null;
  remember: boolean;
  // helpers
  setToken: (t: string | null) => void;
  setUser: (u: User | null) => void;
  setRemember: (v: boolean) => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

const initialState: Pick<State, "token" | "user" | "remember"> = {
  token: null,
  user: null,
  remember: false,
};

export const useAuthStore = create<State>()(
  persist(
    (set, get) => ({
      ...initialState,

      setToken: (t) => set({ token: t }),
      setUser: (u) => set({ user: u }),
      setRemember: (v) => set({ remember: v }),

      // usado depois do login/cadastro
      setAuth: (token, user) => set({ token, user }),

      // usado no botão SAIR
      logout: () => {
        // limpa estado em memória
        set({ ...initialState });
        // como estamos usando persist, o novo estado já sobrescreve no storage
      },
    }),
    {
      name: "trampo-auth",
      // só persiste se "lembrar-me" estiver true
      partialize: (s) =>
        s.remember
          ? { token: s.token, user: s.user, remember: s.remember }
          : { remember: s.remember },
    }
  )
);
