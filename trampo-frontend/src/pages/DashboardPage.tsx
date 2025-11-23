import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-[#f4f5fb]">
      <Navbar variant="app" surface="light" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Bem-vindo de volta,</p>
            <h1 className="text-2xl font-semibold text-slate-900">
              {user?.name || user?.email || "Tramper"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Perfil: <span className="font-medium">{user?.role}</span>
            </p>
          </div>
        </header>

        {/* Aqui depois entra aquele layout completo da imagem (filtros + cards) */}
        <section className="grid grid-cols-[280px,1fr] gap-6">
          {/* Lateral esquerda (filtros) */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-3">Tipo de publicação</h2>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1 text-xs rounded-full bg-orange-500 text-white font-medium">
                  Freelancer
                </button>
                <button className="px-3 py-1 text-xs rounded-full bg-purple-600 text-white font-medium">
                  Procura-se
                </button>
                <button className="px-3 py-1 text-xs rounded-full bg-emerald-500 text-white font-medium">
                  Ofereço
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
              <h2 className="text-sm font-semibold">Filtros</h2>
              <input
                placeholder="Categoria"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Cidade/UF"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Preço mín."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Preço máx."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" className="accent-orange-500" />
                Apenas remoto
              </label>
              <button className="w-full mt-2 rounded-xl bg-slate-900 text-white text-sm py-2">
                Aplicar filtros
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 text-xs text-slate-600 space-y-1">
              <h2 className="text-sm font-semibold mb-2">
                Por que usar o Trampo?
              </h2>
              <ul className="space-y-1 list-disc list-inside">
                <li>Publicações duplas (Procura-se / Ofereço)</li>
                <li>Busca com filtros e ordenação</li>
                <li>Chat integrado e avaliações</li>
              </ul>
            </div>
          </aside>

          {/* Coluna principal: cards */}
          <section className="space-y-4">
            {/* Barra de busca + filtros de tipo */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-2">
              <div className="flex gap-3 items-center mb-4">
                <input
                  placeholder="Pesquisar anúncios..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm"
                />
                <button className="px-5 py-2 rounded-xl bg-[#4f46e5] text-white text-sm font-medium">
                  Buscar
                </button>
              </div>
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  <button className="px-3 py-1 text-xs rounded-full bg-[#4f46e5] text-white">
                    Todos
                  </button>
                  <button className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-700">
                    Procura-se
                  </button>
                  <button className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-700">
                    Ofereço
                  </button>
                  <button className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-700">
                    Remoto
                  </button>
                  <button className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-700">
                    Presencial
                  </button>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <span>Ordenar por:</span>
                  <select className="rounded-xl border border-slate-200 px-2 py-1 text-xs">
                    <option>Mais recentes</option>
                    <option>Menor preço</option>
                    <option>Maior preço</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cards de exemplo */}
            <p className="text-xs text-slate-500 mb-1">
              Encontradas <span className="font-semibold">128</span>{" "}
              oportunidades
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card FREELANCER */}
              <article className="bg-white rounded-2xl shadow-sm p-4 border border-orange-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    FREELANCER
                  </span>
                  <span className="text-xs text-amber-500">★ 4.5</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">
                  Atendente de Loja (Freelancer)
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  Atendimento ao cliente, organização de araras e caixa simples
                  em ação de final de ano.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {["Atendimento", "Caixa", "Vendas"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-700">
                    <p>
                      <span className="font-semibold">R$ 120,00</span> –{" "}
                      <span className="font-semibold">R$ 180,00</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      1–2 dias · diária
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold">
                    ENVIAR PROPOSTA
                  </button>
                </div>
              </article>

              {/* Card OFEREÇO */}
              <article className="bg-white rounded-2xl shadow-sm p-4 border border-emerald-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    OFEREÇO
                  </span>
                  <span className="text-xs text-amber-500">★ 4.5</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">
                  Ofereço Design de Logotipo
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  Criação de identidade visual completa em até 7 dias.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {["Logo", "Branding", "Figma"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-700">
                    <p>
                      a partir de{" "}
                      <span className="font-semibold">R$ 1.200</span>
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold">
                    ENVIAR PROPOSTA
                  </button>
                </div>
              </article>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
