export default function HowItWorks() {
  const steps = [
    { n: 1, title: "Criar um anúncio", desc: "Escolha Procura-se ou Ofereço e publique em minutos." },
    { n: 2, title: "Receber propostas", desc: "Converse pelo chat e ajuste valor e prazo." },
    { n: 3, title: "Concluir e avaliar", desc: "Finalize o trampo e fortaleça sua reputação." },
  ];

  return (
    <section className="pt-10 pb-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-white font-extrabold text-xl">Como funciona</h2>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <article
              key={s.n}
              className="
                group relative rounded-2xl bg-white shadow-lg ring-1 ring-black/5
                p-5 sm:p-6
                transition-transform duration-500 hover:-translate-y-1
                focus-within:-translate-y-1
              "
            >
              <div
                className="
                  inline-flex h-8 w-8 items-center justify-center rounded-full
                  bg-[var(--brand-blue)] text-white text-sm font-bold
                  shadow-sm
                "
              >
                {s.n}
              </div>

              <h3 className="mt-3 text-base font-semibold text-neutral-900">{s.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{s.desc}</p>

              {/* sombra suave extra igual ao efeito visual dos cards */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]" />

              {/* acessibilidade no card inteiro */}
              <a
                href="#"
                className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]"
                aria-label={s.title}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
