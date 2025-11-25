import { useState } from "react";
import LoggedNavbar from "../components/LoggedNavbar";

type AdType = "freelancer" | "ofereco" | "procura-se";

type AdCard = {
  id: number;
  type: AdType;
  title: string;
  description: string;
  category: string;
  city: string;
  uf: string;
  priceRange: string;
  remote: boolean;
};

const MOCK_ADS: AdCard[] = [
  {
    id: 1,
    type: "freelancer",
    title: "Designer freelancer para social media",
    description: "Criação de artes para Instagram, pacotes mensais acessíveis.",
    category: "Design",
    city: "São Paulo",
    uf: "SP",
    priceRange: "R$ 1.000 - R$ 1.500",
    remote: true,
  },
  {
    id: 2,
    type: "ofereco",
    title: "Ofereço vagas para promotor de vendas",
    description: "Atuação em ponto de venda, campanhas sazonais em mercados.",
    category: "Vendas",
    city: "Belém",
    uf: "PA",
    priceRange: "R$ 120 / dia",
    remote: false,
  },
  {
    id: 3,
    type: "procura-se",
    title: "Procura-se fotógrafo de eventos",
    description: "Evento corporativo, cobertura completa e edição básica.",
    category: "Fotografia",
    city: "Curitiba",
    uf: "PR",
    priceRange: "R$ 800 - R$ 1.200",
    remote: false,
  },
];

export function AppDashboardPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<AdType | "todos">("todos");
  const [onlyRemote, setOnlyRemote] = useState(false);

  const filteredAds = MOCK_ADS.filter((ad) => {
    const matchesType =
      selectedType === "todos" ? true : ad.type === selectedType;

    const matchesSearch =
      search.trim().length === 0
        ? true
        : ad.title.toLowerCase().includes(search.toLowerCase()) ||
          ad.description.toLowerCase().includes(search.toLowerCase());

    const matchesRemote = onlyRemote ? ad.remote : true;

    return matchesType && matchesSearch && matchesRemote;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {/* NAVBAR LOGADA IGUAL AO FIGMA */}
      <LoggedNavbar active="inicio" />

      <main className="mx-auto mt-6 w-full max-w-6xl px-4 pb-10">
        {/* CARD DE BUSCA + FILTROS RÁPIDOS (TOPO) */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            {/* busca */}
            <div className="flex-1 min-w-[230px]">
              <div className="flex items-center gap-2 rounded-xl bg-[#f5f7fb] px-3 py-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-[#4a3aff]">
                <span className="text-slate-500">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar anúncios..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* botões de tipo no topo (Todos / Procura-se / Ofereço) */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <button className="rounded-xl bg-[#4a3aff] px-4 py-2 text-xs font-medium text-white shadow-sm">
                Buscar
              </button>

              <button
                onClick={() => setSelectedType("todos")}
                className={`rounded-xl px-4 py-2 text-xs md:text-sm font-medium ${
                  selectedType === "todos"
                    ? "bg-slate-900 text-white"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedType("procura-se")}
                className={`rounded-xl px-4 py-2 text-xs md:text-sm font-medium ${
                  selectedType === "procura-se"
                    ? "bg-slate-900 text-white"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                Procura-se
              </button>
              <button
                onClick={() => setSelectedType("ofereco")}
                className={`rounded-xl px-4 py-2 text-xs md:text-sm font-medium ${
                  selectedType === "ofereco"
                    ? "bg-slate-900 text-white"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                Ofereço
              </button>
            </div>

            {/* remoto / presencial */}
            <div className="ml-auto flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <button
                onClick={() => setOnlyRemote(!onlyRemote)}
                className={`rounded-xl px-4 py-2 font-medium ${
                  onlyRemote
                    ? "bg-slate-900 text-white"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                Remoto
              </button>
              <button className="rounded-xl bg-transparent px-4 py-2 text-slate-600 hover:bg-slate-100">
                Presencial
              </button>
            </div>
          </div>
        </section>

        {/* LAYOUT EM 2 COLUNAS – SEM ARBITRARY CLASS */}
        <div className="mt-2 grid gap-6 md:grid-cols-3 items-start">
          {/* COLUNA ESQUERDA – SIDEBAR (1/3) */}
          <aside className="space-y-4 md:col-span-1">
            {/* Tipo de publicação */}
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">
                Tipo de publicação
              </h2>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <button
                  onClick={() => setSelectedType("freelancer")}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 ${
                    selectedType === "freelancer"
                      ? "bg-[#ff7a00] text-white"
                      : "bg-[#fff2e5] text-[#ff7a00]"
                  }`}
                >
                  FREELANCER
                </button>
                <button
                  onClick={() => setSelectedType("procura-se")}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 ${
                    selectedType === "procura-se"
                      ? "bg-[#4a3aff] text-white"
                      : "bg-[#ecebff] text-[#4a3aff]"
                  }`}
                >
                  PROCURA-SE
                </button>
                <button
                  onClick={() => setSelectedType("ofereco")}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 ${
                    selectedType === "ofereco"
                      ? "bg-[#1f9c5a] text-white"
                      : "bg-[#e3f5ec] text-[#1f9c5a]"
                  }`}
                >
                  OFEREÇO
                </button>
              </div>
            </div>

            {/* Filtros */}
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-800">Filtros</h2>

              <div className="space-y-1 text-sm">
                <label className="text-xs text-slate-500">Categoria</label>
                <select className="w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]">
                  <option value="">Todas</option>
                  <option value="Design">Design</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Fotografia">Fotografia</option>
                </select>
              </div>

              <div className="space-y-1 text-sm">
                <label className="text-xs text-slate-500">Cidade</label>
                <input
                  placeholder="Ex: São Paulo"
                  className="w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="text-xs text-slate-500">Estado (UF)</label>
                <input
                  placeholder="Ex: SP"
                  maxLength={2}
                  className="w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs uppercase text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <label className="text-xs text-slate-500">Preço mín.</label>
                  <input
                    placeholder="R$"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Preço máx.</label>
                  <input
                    placeholder="R$"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={onlyRemote}
                  onChange={(e) => setOnlyRemote(e.target.checked)}
                  className="rounded border-slate-300"
                />
                Apenas remoto
              </label>

              <button className="mt-1 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white">
                Aplicar filtros
              </button>
            </div>

            {/* Por que usar o Trampo? */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-sm font-semibold text-slate-800">
                Por que usar o Trampo?
              </h2>
              <ul className="list-inside list-disc space-y-1 text-xs text-slate-600">
                <li>Publicações duplas (Procura-se / Ofereço)</li>
                <li>Busca com filtros e ordenação</li>
                <li>Chat integrado e avaliações</li>
              </ul>
            </div>
          </aside>

          {/* COLUNA DIREITA – HEADER + CARDS (2/3) */}
          <section className="space-y-4 md:col-span-2">
            {/* header de resultados + ordenação */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-600">
                {filteredAds.length}{" "}
                {filteredAds.length === 1
                  ? "oportunidade encontrada"
                  : "oportunidades encontradas"}
              </p>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>Ordenar por:</span>
                <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#4a3aff]">
                  <option>Mais recentes</option>
                  <option>Maior valor</option>
                  <option>Menor valor</option>
                </select>
              </div>
            </div>

            {/* grid dos cards – 3 colunas no desktop, igual Figma */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredAds.map((ad) => {
                const typeLabel =
                  ad.type === "freelancer"
                    ? "FREELANCER"
                    : ad.type === "ofereco"
                    ? "OFEREÇO"
                    : "PROCURA-SE";

                const typeClasses =
                  ad.type === "freelancer"
                    ? "bg-[#fff2e5] text-[#ff7a00]"
                    : ad.type === "procura-se"
                    ? "bg-[#ecebff] text-[#4a3aff]"
                    : "bg-[#e3f5ec] text-[#1f9c5a]";

                const buttonClasses =
                  ad.type === "freelancer"
                    ? "bg-[#ff7a00] hover:bg-[#e56d00]"
                    : ad.type === "procura-se"
                    ? "bg-[#4a3aff] hover:bg-[#392fdd]"
                    : "bg-[#1f9c5a] hover:bg-[#178249]";

                return (
                  <article
                    key={ad.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {/* TOPO DO CARD – RESPONSIVO */}
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-x-2 gap-y-1 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 font-semibold ${typeClasses}`}
                        >
                          {typeLabel}
                        </span>
                        <span className="rounded-full bg-[#f5f7fb] px-2 py-1 text-[11px] text-slate-600">
                          {ad.category}
                        </span>
                      </div>
                      <span className="text-slate-500 whitespace-nowrap">
                        {ad.city} • {ad.uf}
                      </span>
                    </div>

                    {/* CONTEÚDO */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {ad.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {ad.description}
                      </p>

                      {ad.remote && (
                        <div className="mt-2">
                          <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600">
                            Remoto
                          </span>
                        </div>
                      )}
                    </div>

                    {/* RODAPÉ */}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-700">
                      <p className="font-semibold">{ad.priceRange}</p>

                      <button
                        className={`rounded-full px-4 py-2 text-[11px] font-semibold text-white ${buttonClasses} transition-colors`}
                      >
                        ENVIAR PROPOSTA
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
