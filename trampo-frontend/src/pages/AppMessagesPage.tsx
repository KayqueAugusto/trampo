// src/pages/AppMessagesPage.tsx
import LoggedNavbar from "../components/LoggedNavbar";

export function AppMessagesPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <LoggedNavbar active="mensagens" />

      <main className="mx-auto mt-6 w-full max-w-6xl px-4 pb-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Mensagens
          </h1>
          <p className="text-sm text-slate-600">
            Aqui vamos listar as conversas entre freelancers e demandantes,
            parecido com o WhatsApp. No momento é só um rascunho em branco para
            configurarmos as rotas.
          </p>
        </section>
      </main>
    </div>
  );
}
