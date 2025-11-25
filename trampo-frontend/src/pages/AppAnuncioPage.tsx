// src/pages/AppAnuncioPage.tsx
import LoggedNavbar from "../components/LoggedNavbar";

export function AppAnuncioPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <LoggedNavbar active="anuncio" />

      <main className="mx-auto mt-6 w-full max-w-6xl px-4 pb-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Publicar anúncio
          </h1>
          <p className="text-sm text-slate-600">
            Aqui futuramente vamos montar o formulário completo para criar ou
            editar anúncios. Por enquanto esta página está em construção. 🙂
          </p>
        </section>
      </main>
    </div>
  );
}
