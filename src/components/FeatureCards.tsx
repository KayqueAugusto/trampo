export default function FeatureCards() {
  const items = [
    {
      id: "pub",
      title: "Publicações Duplas",
      desc: "Publique Procura-se ou Ofereço com poucos cliques e alcance rápido.",
      iconBg: "bg-[var(--brand-orange)]/10",
      iconRing: "ring-[var(--brand-orange)]/25",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v6H4z" />
          <path d="M4 14h16v6H4z" />
        </svg>
      ),
    },
    {
      id: "search",
      title: "Busca Inteligente",
      desc: "Filtre por categoria, cidade, remoto/presencial e encontre o match ideal.",
      iconBg: "bg-[var(--brand-blue)]/10",
      iconRing: "ring-[var(--brand-blue)]/25",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-3.5-3.5" />
        </svg>
      ),
    },
    {
      id: "chat",
      title: "Chat Integrado",
      desc: "Negocie valores e prazos com segurança e conclua com avaliação ⭐.",
      iconBg: "bg-emerald-500/10",
      iconRing: "ring-emerald-500/20",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a4 4 0 0 1-4 4H8l-4 4v-8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
          <path d="M7 8h10M7 4h7" />
        </svg>
      ),
    },
  ];

return (
    <section
      id="features"
      aria-labelledby="features"
      className="bg-transparent mt-16 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.id}
              className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-5 sm:p-6 relative transition-transform duration-500 hover:-translate-y-1"
            >
              {/* Ícone, título e descrição igual antes */}
              <div
                aria-hidden
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1",
                  it.iconBg,
                  it.iconRing,
                ].join(" ")}
              >
                <span className="text-neutral-800">{it.iconSvg}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-900">{it.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
