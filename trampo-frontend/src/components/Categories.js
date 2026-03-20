import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Categories() {
    const cats = ["TI", "Design", "Ensino", "Construção", "Serviços Pessoais", "Marketing"];
    return (_jsxs("section", { className: "pt-30 pb-20", children: [" ", _jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-white font-extrabold text-xl", children: "Categorias populares" }), _jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: cats.map((c) => (_jsx("a", { href: "#", className: "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium\r\n                         bg-white/90 text-neutral-800 ring-1 ring-black/10 shadow-sm\r\n                         hover:bg-white", children: c }, c))) })] })] }));
}
