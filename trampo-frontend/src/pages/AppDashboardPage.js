import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LoggedNavbar from "../components/LoggedNavbar";
const MOCK_ADS = [
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
    const [selectedType, setSelectedType] = useState("todos");
    const [onlyRemote, setOnlyRemote] = useState(false);
    const filteredAds = MOCK_ADS.filter((ad) => {
        const matchesType = selectedType === "todos" ? true : ad.type === selectedType;
        const matchesSearch = search.trim().length === 0
            ? true
            : ad.title.toLowerCase().includes(search.toLowerCase()) ||
                ad.description.toLowerCase().includes(search.toLowerCase());
        const matchesRemote = onlyRemote ? ad.remote : true;
        return matchesType && matchesSearch && matchesRemote;
    });
    return (_jsxs("div", { className: "min-h-screen bg-[#f5f7fb] text-slate-900", children: [_jsx(LoggedNavbar, { active: "inicio" }), _jsxs("main", { className: "mx-auto mt-6 w-full max-w-6xl px-4 pb-10", children: [_jsx("section", { className: "mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm", children: _jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [_jsx("div", { className: "flex-1 min-w-[230px]", children: _jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-[#f5f7fb] px-3 py-2 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-[#4a3aff]", children: [_jsx("span", { className: "text-slate-500", children: "\uD83D\uDD0D" }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Pesquisar an\u00FAncios...", className: "w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" })] }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs md:text-sm", children: [_jsx("button", { className: "rounded-xl bg-[#4a3aff] px-4 py-2 text-xs font-medium text-white shadow-sm", children: "Buscar" }), _jsx("button", { onClick: () => setSelectedType("todos"), className: `rounded-xl px-4 py-2 text-xs md:text-sm font-medium ${selectedType === "todos"
                                                ? "bg-slate-900 text-white"
                                                : "bg-transparent text-slate-600 hover:bg-slate-100"}`, children: "Todos" }), _jsx("button", { onClick: () => setSelectedType("procura-se"), className: `rounded-xl px-4 py-2 text-xs md:text-sm font-medium ${selectedType === "procura-se"
                                                ? "bg-slate-900 text-white"
                                                : "bg-transparent text-slate-600 hover:bg-slate-100"}`, children: "Procura-se" }), _jsx("button", { onClick: () => setSelectedType("ofereco"), className: `rounded-xl px-4 py-2 text-xs md:text-sm font-medium ${selectedType === "ofereco"
                                                ? "bg-slate-900 text-white"
                                                : "bg-transparent text-slate-600 hover:bg-slate-100"}`, children: "Ofere\u00E7o" })] }), _jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2 text-xs md:text-sm", children: [_jsx("button", { onClick: () => setOnlyRemote(!onlyRemote), className: `rounded-xl px-4 py-2 font-medium ${onlyRemote
                                                ? "bg-slate-900 text-white"
                                                : "bg-transparent text-slate-600 hover:bg-slate-100"}`, children: "Remoto" }), _jsx("button", { className: "rounded-xl bg-transparent px-4 py-2 text-slate-600 hover:bg-slate-100", children: "Presencial" })] })] }) }), _jsxs("div", { className: "mt-2 grid gap-6 md:grid-cols-3 items-start", children: [_jsxs("aside", { className: "space-y-4 md:col-span-1", children: [_jsxs("div", { className: "space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm", children: [_jsx("h2", { className: "text-sm font-semibold text-slate-800", children: "Tipo de publica\u00E7\u00E3o" }), _jsxs("div", { className: "flex flex-wrap gap-2 text-xs font-semibold", children: [_jsx("button", { onClick: () => setSelectedType("freelancer"), className: `inline-flex items-center justify-center rounded-full px-4 py-2 ${selectedType === "freelancer"
                                                            ? "bg-[#ff7a00] text-white"
                                                            : "bg-[#fff2e5] text-[#ff7a00]"}`, children: "FREELANCER" }), _jsx("button", { onClick: () => setSelectedType("procura-se"), className: `inline-flex items-center justify-center rounded-full px-4 py-2 ${selectedType === "procura-se"
                                                            ? "bg-[#4a3aff] text-white"
                                                            : "bg-[#ecebff] text-[#4a3aff]"}`, children: "PROCURA-SE" }), _jsx("button", { onClick: () => setSelectedType("ofereco"), className: `inline-flex items-center justify-center rounded-full px-4 py-2 ${selectedType === "ofereco"
                                                            ? "bg-[#1f9c5a] text-white"
                                                            : "bg-[#e3f5ec] text-[#1f9c5a]"}`, children: "OFERE\u00C7O" })] })] }), _jsxs("div", { className: "space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm", children: [_jsx("h2", { className: "text-sm font-semibold text-slate-800", children: "Filtros" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("label", { className: "text-xs text-slate-500", children: "Categoria" }), _jsxs("select", { className: "w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]", children: [_jsx("option", { value: "", children: "Todas" }), _jsx("option", { value: "Design", children: "Design" }), _jsx("option", { value: "Vendas", children: "Vendas" }), _jsx("option", { value: "Fotografia", children: "Fotografia" })] })] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("label", { className: "text-xs text-slate-500", children: "Cidade" }), _jsx("input", { placeholder: "Ex: S\u00E3o Paulo", className: "w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]" })] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("label", { className: "text-xs text-slate-500", children: "Estado (UF)" }), _jsx("input", { placeholder: "Ex: SP", maxLength: 2, className: "w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs uppercase text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs text-slate-500", children: "Pre\u00E7o m\u00EDn." }), _jsx("input", { placeholder: "R$", className: "mt-1 w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs text-slate-500", children: "Pre\u00E7o m\u00E1x." }), _jsx("input", { placeholder: "R$", className: "mt-1 w-full rounded-lg border border-slate-200 bg-[#f5f7fb] px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-[#4a3aff]" })] })] }), _jsxs("label", { className: "flex items-center gap-2 text-xs text-slate-600", children: [_jsx("input", { type: "checkbox", checked: onlyRemote, onChange: (e) => setOnlyRemote(e.target.checked), className: "rounded border-slate-300" }), "Apenas remoto"] }), _jsx("button", { className: "mt-1 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white", children: "Aplicar filtros" })] }), _jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm", children: [_jsx("h2", { className: "mb-2 text-sm font-semibold text-slate-800", children: "Por que usar o Trampo?" }), _jsxs("ul", { className: "list-inside list-disc space-y-1 text-xs text-slate-600", children: [_jsx("li", { children: "Publica\u00E7\u00F5es duplas (Procura-se / Ofere\u00E7o)" }), _jsx("li", { children: "Busca com filtros e ordena\u00E7\u00E3o" }), _jsx("li", { children: "Chat integrado e avalia\u00E7\u00F5es" })] })] })] }), _jsxs("section", { className: "space-y-4 md:col-span-2", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsxs("p", { className: "text-sm text-slate-600", children: [filteredAds.length, " ", filteredAds.length === 1
                                                        ? "oportunidade encontrada"
                                                        : "oportunidades encontradas"] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [_jsx("span", { children: "Ordenar por:" }), _jsxs("select", { className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#4a3aff]", children: [_jsx("option", { children: "Mais recentes" }), _jsx("option", { children: "Maior valor" }), _jsx("option", { children: "Menor valor" })] })] })] }), _jsx("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3", children: filteredAds.map((ad) => {
                                            const typeLabel = ad.type === "freelancer"
                                                ? "FREELANCER"
                                                : ad.type === "ofereco"
                                                    ? "OFEREÇO"
                                                    : "PROCURA-SE";
                                            const typeClasses = ad.type === "freelancer"
                                                ? "bg-[#fff2e5] text-[#ff7a00]"
                                                : ad.type === "procura-se"
                                                    ? "bg-[#ecebff] text-[#4a3aff]"
                                                    : "bg-[#e3f5ec] text-[#1f9c5a]";
                                            const buttonClasses = ad.type === "freelancer"
                                                ? "bg-[#ff7a00] hover:bg-[#e56d00]"
                                                : ad.type === "procura-se"
                                                    ? "bg-[#4a3aff] hover:bg-[#392fdd]"
                                                    : "bg-[#1f9c5a] hover:bg-[#178249]";
                                            return (_jsxs("article", { className: "flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [_jsxs("div", { className: "mb-3 flex flex-wrap items-start justify-between gap-x-2 gap-y-1 text-[11px]", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: `rounded-full px-3 py-1 font-semibold ${typeClasses}`, children: typeLabel }), _jsx("span", { className: "rounded-full bg-[#f5f7fb] px-2 py-1 text-[11px] text-slate-600", children: ad.category })] }), _jsxs("span", { className: "text-slate-500 whitespace-nowrap", children: [ad.city, " \u2022 ", ad.uf] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900", children: ad.title }), _jsx("p", { className: "mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2", children: ad.description }), ad.remote && (_jsx("div", { className: "mt-2", children: _jsx("span", { className: "rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-600", children: "Remoto" }) }))] }), _jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-slate-700", children: [_jsx("p", { className: "font-semibold", children: ad.priceRange }), _jsx("button", { className: `rounded-full px-4 py-2 text-[11px] font-semibold text-white ${buttonClasses} transition-colors`, children: "ENVIAR PROPOSTA" })] })] }, ad.id));
                                        }) })] })] })] })] }));
}
