export default function Footer() {
  return (
    <footer className="border-t border-white/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <span className="text-white/80 text-sm">© 2025 Trampo</span>
        <nav className="flex items-center gap-4 text-white/80 text-sm">
          <a href="#" className="hover:text-white">Termos</a>
          <a href="#" className="hover:text-white">Privacidade</a>
          <a href="#" className="hover:text-white">Contato</a>
        </nav>
      </div>
    </footer>
  );
}
