// src/pages/AppProfilePage.tsx
import LoggedNavbar from "../components/LoggedNavbar";

export function AppProfilePage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <LoggedNavbar active="perfil" />

      <main className="mx-auto mt-6 w-full max-w-6xl px-4 pb-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Meu perfil
          </h1>
          <p className="text-sm text-slate-600">
            Nesta área vamos montar as informações do usuário (foto, bio,
            habilidades, avaliações, etc.). Por enquanto é só o esqueleto da
            página para as rotas funcionarem.
          </p>
        </section>
      </main>
    </div>
  );
}
