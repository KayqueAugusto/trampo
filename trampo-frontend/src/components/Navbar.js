import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
export default function Navbar({ variant = "public", surface = "light" }) {
    const [open, setOpen] = useState(false); // menu mobile
    const [authOpen, setAuthOpen] = useState(false); // modal
    const [authTab, setAuthTab] = useState("login"); // aba inicial
    const isPublic = variant === "public";
    const isDark = surface === "dark";
    const publicLinks = [
        { id: "caracteristicas", label: "Características", href: "#" },
        { id: "categorias", label: "Categorias", href: "#" },
        { id: "como-funciona", label: "Como funciona", href: "#" },
    ];
    const appLinks = [
        { id: "inicio", label: "INÍCIO", href: "#" },
        { id: "anuncios", label: "ANÚNCIOS", href: "#", active: true },
        { id: "mensagens", label: "MENSAGENS", href: "#" },
        { id: "perfil", label: "PERFIL", href: "#" },
    ];
    const links = isPublic ? publicLinks : appLinks;
    function openAuth(e, tab) {
        e.preventDefault();
        setAuthTab(tab);
        setAuthOpen(true);
    }
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: [
                    isPublic
                        ? (isDark ? "bg-transparent" : "bg-white border-b border-black/5 shadow-sm")
                        : "bg-white border-b border-black/5 shadow-sm",
                    "sticky top-0 z-50",
                ].join(" "), children: [_jsxs("nav", { className: [
                            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                            isPublic ? "h-16" : "h-14",
                            "flex items-center justify-between",
                        ].join(" "), "aria-label": "Principal", children: [_jsxs("a", { href: "#", className: "flex items-center gap-2", children: [_jsx("span", { "aria-hidden": true, className: [
                                            "inline-flex items-center justify-center rounded-full ring-1 ring-black/5",
                                            isPublic ? "h-7 w-7" : "h-6 w-6",
                                            "bg-[var(--brand-orange)]",
                                        ].join(" "), children: _jsx("svg", { viewBox: "0 0 24 24", className: isPublic ? "h-4 w-4" : "h-3.5 w-3.5", fill: "none", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M5 13l4 4L19 7" }) }) }), _jsx("span", { className: [
                                            "font-semibold tracking-tight",
                                            isPublic
                                                ? (isDark ? "text-white text-base" : "text-neutral-900 text-base")
                                                : "text-neutral-900 text-[15px]",
                                        ].join(" "), children: "Trampo" })] }), _jsx("ul", { className: "hidden md:flex items-center gap-8", children: links.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: [
                                            "transition-colors rounded-sm px-1 py-0.5",
                                            isPublic
                                                ? (isDark
                                                    ? "text-white/90 hover:text-white text-sm"
                                                    : "text-neutral-800 hover:text-neutral-900 text-sm")
                                                : [
                                                    "text-[13px] font-semibold uppercase tracking-wide",
                                                    // @ts-ignore
                                                    link.active
                                                        ? "text-[var(--brand-orange)]"
                                                        : "text-neutral-700 hover:text-neutral-900",
                                                ].join(" "),
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] focus-visible:ring-offset-2",
                                            isPublic
                                                ? (isDark ? "focus-visible:ring-offset-[transparent]" : "focus-visible:ring-offset-white")
                                                : "focus-visible:ring-offset-white",
                                        ].join(" "), children: link.label }) }, link.id))) }), isPublic ? (_jsxs("div", { className: "hidden md:flex items-center gap-3", children: [_jsx("a", { href: "#", onClick: (e) => openAuth(e, "login"), className: [
                                            "inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2",
                                            isDark
                                                ? "bg-white/15 text-white hover:bg-white/25 focus-visible:ring-white/70"
                                                : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:ring-neutral-300",
                                        ].join(" "), children: "Entrar" }), _jsx("a", { href: "#", onClick: (e) => openAuth(e, "register"), className: "inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]", children: "Cadastrar" })] })) : (_jsx("div", { className: "hidden md:flex", children: _jsx("a", { href: "#", className: "inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold text-white bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] focus-visible:ring-offset-2", children: "Publicar An\u00FAncio" }) })), _jsxs("button", { type: "button", className: [
                                    "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border",
                                    isPublic
                                        ? (isDark
                                            ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                                            : "border-black/10 bg-white text-neutral-700 hover:bg-neutral-50")
                                        : "border-black/10 bg-white text-neutral-700 hover:bg-neutral-50",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]",
                                ].join(" "), "aria-controls": "mobile-menu", "aria-expanded": open, onClick: () => setOpen((v) => !v), children: [_jsx("span", { className: "sr-only", children: "Abrir menu" }), open ? (_jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M6 6l12 12M6 18L18 6" }) })) : (_jsx("svg", { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M3 6h18M3 12h18M3 18h18" }) }))] })] }), _jsx("div", { id: "mobile-menu", className: [
                            "md:hidden",
                            isPublic ? (isDark ? "bg-white/10 backdrop-blur border-t border-white/15" : "bg-white border-t border-black/5")
                                : "bg-white border-t border-black/5",
                            open ? "block" : "hidden",
                        ].join(" "), children: _jsxs("div", { className: "px-4 py-3 space-y-2", children: [links.map((link) => (_jsx("a", { href: link.href, className: [
                                        "block rounded-md px-3 py-2 text-sm font-medium",
                                        isPublic
                                            ? (isDark ? "text-white/90 hover:bg-white/10" : "text-neutral-700 hover:bg-neutral-50")
                                            : "text-neutral-700 hover:bg-neutral-50",
                                    ].join(" "), onClick: () => setOpen(false), children: link.label }, link.id))), isPublic ? (_jsxs("div", { className: "flex gap-2", children: [_jsx("a", { href: "#", onClick: (e) => { openAuth(e, "login"); setOpen(false); }, className: [
                                                "inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
                                                isDark ? "bg-white/15 text-white hover:bg-white/25" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
                                            ].join(" "), children: "Entrar" }), _jsx("a", { href: "#", onClick: (e) => { openAuth(e, "register"); setOpen(false); }, className: "inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)]", children: "Cadastrar" })] })) : (_jsx("a", { href: "#", className: "inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)]", onClick: () => setOpen(false), children: "Publicar An\u00FAncio" }))] }) })] }), _jsx(AuthModal, { open: authOpen, onClose: () => setAuthOpen(false), initialTab: authTab })] }));
}
