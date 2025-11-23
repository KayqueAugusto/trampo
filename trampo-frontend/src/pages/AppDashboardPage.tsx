import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Navbar from "../components/Navbar";


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
  const user = useAuthStore((s) => s.user);
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
    <div className="min-h-screen bg-gradient-to-br from-[#140E32] via-[#1B1540] to-[#221956] text-white">
      <Navbar variant="public" surface="light" />

      <main className="mx-auto mt-6 w-full max-w-6xl px-4 pb-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/60">Bem-vindo de volta,</p>
            <h1 className="text-2xl font-semibold">
              {user?.name || "usuário"} 👋
            </h1>
          </div>
          <button className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/30">
            Publicar anúncio
          </button>
        </div>

        <div className="mb-4 flex gap-4 border-b border-white/10 text-sm">
          {["Início", "Anúncios", "Mensagens", "Perfil"].map((tab, idx) => (
            <button
              key={tab}
              className={`pb-2 ${
                idx === 0
                  ? "border-b-2 border-orange-400 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/10 focus-within:ring-2">
              <span className="text-white/60">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar oportunidades, cargos, habilidades..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
            <span className="text-white/60">Tipo de publicação:</span>
            <button
              onClick={() => setSelectedType("todos")}
              className={`rounded-full px-3 py-1 ${
                selectedType === "todos"
                  ? "bg-white text-[#140E32]"
                  : "bg-white/10 text-white/80 hover:bg-white/15"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedType("freelancer")}
              className={`rounded-full px-3 py-1 ${
                selectedType === "freelancer"
                  ? "bg-emerald-400 text-[#140E32]"
                  : "bg-white/10 text-white/80 hover:bg-white/15"
              }`}
            >
              Freelancer
            </button>
            <button
              onClick={() => setSelectedType("procura-se")}
              className={`rounded-full px-3 py-1 ${
                selectedType === "procura-se"
                  ? "bg-sky-400 text-[#140E32]"
                  : "bg-white/10 text-white/80 hover:bg-white/15"
              }`}
            >
              Procura-se
            </button>
            <button
              onClick={() => setSelectedType("ofereco")}
              className={`rounded-full px-3 py-1 ${
                selectedType === "ofereco"
                  ? "bg-orange-400 text-[#140E32]"
                  : "bg-white/10 text-white/80 hover:bg-white/15"
              }`}
            >
              Ofereço
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[260px,1fr]">
          <aside className="space-y-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <h2 className="text-sm font-semibold text-white/90">
              Filtros avançados
            </h2>

            <div className="space-y-1 text-sm">
              <label className="text-xs text-white/60">Categoria</label>
              <select className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10">
                <option className="bg-[#140E32]" value="">
                  Todas
                </option>
                <option className="bg-[#140E32]" value="Design">
                  Design
                </option>
                <option className="bg-[#140E32]" value="Vendas">
                  Vendas
                </option>
                <option className="bg-[#140E32]" value="Fotografia">
                  Fotografia
                </option>
              </select>
            </div>

            <div className="space-y-1 text-sm">
              <label className="text-xs text-white/60">Cidade</label>
              <input
                placeholder="Ex: São Paulo"
                className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="text-xs text-white/60">Estado (UF)</label>
              <input
                placeholder="Ex: SP"
                maxLength={2}
                className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm uppercase text-white outline-none ring-1 ring-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <label className="text-xs text-white/60">Preço mín.</label>
                <input
                  placeholder="R$"
                  className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
                />
              </div>
              <div>
                <label className="text-xs text-white/60">Preço máx.</label>
                <input
                  placeholder="R$"
                  className="mt-1 w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-white/80">
              <input
                type="checkbox"
                checked={onlyRemote}
                onChange={(e) => setOnlyRemote(e.target.checked)}
                className="accent-white"
              />
              Apenas remoto
            </label>

            <button className="mt-2 w-full rounded-xl bg-white/90 py-2 text-sm font-semibold text-[#140E32]">
              Aplicar filtros
            </button>
          </aside>

          <section className="space-y-3">
            <p className="text-xs text-white/60">
              {filteredAds.length} resultados encontrados
            </p>

            <div className="grid gap-4">
              {filteredAds.map((ad) => (
                <article
                  key={ad.id}
                  className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`rounded-full px-2 py-0.5 font-semibold ${
                          ad.type === "freelancer"
                            ? "bg-emerald-400 text-[#140E32]"
                            : ad.type === "procura-se"
                            ? "bg-sky-400 text-[#140E32]"
                            : "bg-orange-400 text-[#140E32]"
                        }`}
                      >
                        {ad.type === "freelancer"
                          ? "Freelancer"
                          : ad.type === "procura-se"
                          ? "Procura-se"
                          : "Ofereço"}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">
                        {ad.category}
                      </span>
                    </div>
                    <span className="text-xs text-white/60">
                      {ad.city} • {ad.uf}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold">{ad.title}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {ad.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
                    <span>{ad.priceRange}</span>
                    <div className="flex items-center gap-2">
                      {ad.remote && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-emerald-300">
                          Remoto
                        </span>
                      )}
                      <button className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#140E32]">
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
