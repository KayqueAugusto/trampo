export default function Categories() {
  const cats = ["TI", "Design", "Ensino", "Construção", "Serviços Pessoais", "Marketing"];

  return (
    <section className="pt-30 pb-20"> {/* ⬅ aumentei o padding inferior */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-white font-extrabold text-xl">Categorias populares</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {cats.map((c) => (
            <a
              key={c}
              href="#"
              className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium
                         bg-white/90 text-neutral-800 ring-1 ring-black/10 shadow-sm
                         hover:bg-white"
            >
              {c}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
