export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center text-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-white font-extrabold leading-tight tracking-[-0.02em] text-4xl sm:text-5xl lg:text-6xl">
          Conectando quem precisa
          <br className="hidden sm:block" />
          <span className="sm:whitespace-nowrap"> com quem faz</span>
        </h1>

        <p className="mt-4 text-white/85 text-base sm:text-lg">
          Descubra oportunidades de trabalho ou publique um serviço em segundos.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar anúncios..."
              className="w-full rounded-xl bg-white text-neutral-800 placeholder:text-neutral-400 shadow-lg outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-indigo-500/70 py-3.5 pl-4 pr-12 text-sm"
            />
            <button
              className="absolute right-1 top-1.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] text-white shadow"
              aria-label="Buscar"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-3.5-3.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-dark)] shadow"
          >
            Explorar Anúncios
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)] shadow"
          >
            Publicar Anúncio
          </a>
        </div>
      </div>
    </section>
  );
}
