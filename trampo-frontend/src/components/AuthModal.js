import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { login as loginApi, register as registerApi, } from "../services/authService";
import { useAuthStore } from "../store/authStore";
const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    remember: z.boolean(),
});
const registerSchema = z
    .object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
    role: z.enum(["freelancer", "demandante"]),
    acceptTerms: z.boolean().refine((value) => value === true, {
        message: "Aceite os termos para continuar",
    }),
})
    .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não coincidem",
});
export function AuthModal({ open, onClose, initialTab = "login", }) {
    const [tab, setTab] = useState(initialTab);
    const [showPassword, setShowPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (open)
            setTab(initialTab);
    }, [open, initialTab]);
    const setAuth = useAuthStore((s) => s.setAuth);
    const setRemember = useAuthStore((s) => s.setRemember);
    const { register: rz, handleSubmit, formState: { errors: eLogin, isSubmitting: loadingLogin }, } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });
    const { register: rf, handleSubmit: handleRegister, formState: { errors: eReg, isSubmitting: loadingReg }, } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: "freelancer",
            acceptTerms: false,
        },
    });
    useEffect(() => {
        const esc = (ev) => {
            if (ev.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, [onClose]);
    function handleAuthSuccess(auth, remember) {
        setAuth(auth.token, auth.user);
        if (typeof remember === "boolean") {
            setRemember(remember);
        }
        onClose();
        navigate("/app");
    }
    async function onSubmitLogin(data) {
        try {
            const res = await loginApi({
                email: data.email,
                password: data.password,
                remember: !!data.remember,
            });
            handleAuthSuccess(res, !!data.remember);
        }
        catch (err) {
            console.error(err);
            alert("Não foi possível entrar. Verifique e-mail/senha.");
        }
    }
    async function onSubmitRegister(data) {
        try {
            const res = await registerApi({
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                role: data.role,
                acceptTerms: data.acceptTerms,
            });
            handleAuthSuccess(res, false);
        }
        catch (err) {
            console.error(err);
            alert("Não foi possível criar sua conta. Tente novamente.");
        }
    }
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 grid place-items-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/40", onClick: onClose }), _jsx("div", { className: "relative w-[92vw] max-w-md rounded-2xl p-[1px] shadow-2xl", style: {
                    background: "linear-gradient(135deg, rgba(255,122,0,.8), rgba(91,84,255,.8))",
                }, children: _jsxs("div", { className: "rounded-2xl bg-[rgba(20,18,51,0.8)] p-6 backdrop-blur-md", children: [_jsxs("div", { className: "mb-5 flex items-center justify-between", children: [_jsxs("div", { className: "flex gap-6", children: [_jsx("button", { onClick: () => setTab("login"), className: `pb-1 text-lg font-semibold ${tab === "login" ? "border-b-2 text-white" : "text-white/70"}`, children: "Entrar" }), _jsx("button", { onClick: () => setTab("register"), className: `pb-1 text-lg font-semibold ${tab === "register" ? "border-b-2 text-white" : "text-white/70"}`, children: "Cadastrar" })] }), _jsx("button", { onClick: onClose, className: "text-white/70 hover:text-white", children: "\u2715" })] }), tab === "login" ? (_jsxs("form", { onSubmit: handleSubmit(onSubmitLogin), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-white/80", children: "Email" }), _jsx("input", { ...rz("email"), placeholder: "Email", className: "mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2" }), eLogin.email && (_jsx("p", { className: "mt-1 text-xs text-red-300", children: eLogin.email.message }))] }), _jsxs("div", { className: "relative", children: [_jsx("label", { className: "text-sm text-white/80", children: "Senha" }), _jsx("input", { type: showPassword ? "text" : "password", ...rz("password"), placeholder: "Senha", className: "mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2" }), _jsx("button", { type: "button", "aria-label": showPassword ? "Ocultar senha" : "Mostrar senha", onClick: () => setShowPassword((v) => !v), className: "absolute bottom-3 right-3 grid h-5 w-5 place-items-center rounded-full text-white/80 hover:text-white", tabIndex: 0, children: showPassword ? (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: _jsx("circle", { cx: "10", cy: "10", r: "6" }) })) : (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", "aria-hidden": "true", children: _jsx("circle", { cx: "10", cy: "10", r: "6", strokeWidth: "2" }) })) }), eLogin.password && (_jsx("p", { className: "mt-1 text-xs text-red-300", children: eLogin.password.message }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("label", { className: "flex items-center gap-2 text-white/80", children: [_jsx("input", { type: "checkbox", ...rz("remember"), className: "accent-white" }), "Lembrar-me"] }), _jsx("a", { href: "#", className: "text-sm text-white/70 hover:text-white/90", children: "Esqueceu sua senha?" })] }), _jsx("button", { disabled: loadingLogin, className: "w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white disabled:opacity-60", children: loadingLogin ? "Entrando…" : "Entrar" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-px flex-1 bg-white/15" }), _jsx("span", { className: "text-sm text-white/60", children: "ou" }), _jsx("div", { className: "h-px flex-1 bg-white/15" })] }), _jsxs("button", { type: "button", className: "flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-neutral-900", onClick: () => alert("Google OAuth — conectar no backend /auth/google"), children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", className: "h-5 w-5", children: [_jsx("path", { fill: "#FFC107", d: "M43.611 20.083H42V20H24v8h11.303C33.673 31.876 29.223 35 24 35c-7.18 0-13-5.82-13-13s5.82-13 13-13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1 11.85 1 2 10.85 2 23s9.85 22 22 22c12.15 0 22-9.85 22-22c0-1.477-.153-2.918-.389-4.317z" }), _jsx("path", { fill: "#FF3D00", d: "M6.306 14.691l6.571 4.819C14.48 16.2 18.87 13 24 13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1C15.317 1 7.853 5.777 4.116 12.691z" }), _jsx("path", { fill: "#4CAF50", d: "M24 45c5.164 0 9.86-1.977 13.409-5.197l-6.196-5.238C29.04 36.091 26.658 37 24 37c-5.192 0-9.594-3.293-11.188-7.895l-6.535 5.03C9.978 40.317 16.52 45 24 45z" }), _jsx("path", { fill: "#1976D2", d: "M43.611 20.083H42V20H24v8h11.303c-1.088 3.132-3.5 5.46-6.794 6.565l6.196 5.238C36.377 41.899 41 38 41 23c0-1.477-.153-2.918-.389-4.317z" })] }), "ENTRAR COM O GOOGLE"] })] })) : (_jsxs("form", { onSubmit: handleRegister(onSubmitRegister), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-white/80", children: "E-mail" }), _jsx("input", { ...rf("email"), placeholder: "seu@email.com", className: "mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2" }), eReg.email && (_jsx("p", { className: "mt-1 text-xs text-red-300", children: eReg.email.message }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("label", { className: "text-sm text-white/80", children: "Senha" }), _jsx("input", { type: showRegPassword ? "text" : "password", ...rf("password"), className: "mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2" }), _jsx("button", { type: "button", "aria-label": showRegPassword ? "Ocultar senha" : "Mostrar senha", onClick: () => setShowRegPassword((v) => !v), className: "absolute bottom-3 right-3 grid h-5 w-5 place-items-center rounded-full text-white/80 hover:text-white", tabIndex: 0, children: showRegPassword ? (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: _jsx("circle", { cx: "10", cy: "10", r: "6" }) })) : (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", "aria-hidden": "true", children: _jsx("circle", { cx: "10", cy: "10", r: "6", strokeWidth: "2" }) })) })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { className: "text-sm text-white/80", children: "Confirmar senha" }), _jsx("input", { type: showConfirmPassword ? "text" : "password", ...rf("confirmPassword"), className: "mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2" }), _jsx("button", { type: "button", "aria-label": showConfirmPassword ? "Ocultar senha" : "Mostrar senha", onClick: () => setShowConfirmPassword((v) => !v), className: "absolute bottom-3 right-3 grid h-5 w-5 place-items-center rounded-full text-white/80 hover:text-white", tabIndex: 0, children: showConfirmPassword ? (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: _jsx("circle", { cx: "10", cy: "10", r: "6" }) })) : (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", "aria-hidden": "true", children: _jsx("circle", { cx: "10", cy: "10", r: "6", strokeWidth: "2" }) })) })] })] }), (eReg.password || eReg.confirmPassword) && (_jsx("p", { className: "text-xs text-red-300", children: eReg.password?.message || eReg.confirmPassword?.message })), _jsxs("div", { className: "flex gap-3", children: [_jsxs("label", { className: "flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white/90 ring-1 ring-white/10", children: [_jsx("input", { type: "radio", value: "freelancer", ...rf("role"), className: "accent-white" }), "Freelancer"] }), _jsxs("label", { className: "flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white/90 ring-1 ring-white/10", children: [_jsx("input", { type: "radio", value: "demandante", ...rf("role"), className: "accent-white" }), "Demandante"] })] }), _jsxs("label", { className: "flex items-center gap-2 text-white/80", children: [_jsx("input", { type: "checkbox", ...rf("acceptTerms"), className: "accent-white" }), "Eu aceito os Termos de uso"] }), eReg.acceptTerms && (_jsx("p", { className: "text-xs text-red-300", children: eReg.acceptTerms.message })), _jsx("button", { disabled: loadingReg, className: "w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white disabled:opacity-60", children: loadingReg ? "Criando…" : "Criar conta" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-px flex-1 bg-white/15" }), _jsx("span", { className: "text-sm text-white/60", children: "ou" }), _jsx("div", { className: "h-px flex-1 bg-white/15" })] }), _jsxs("button", { type: "button", className: "flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-neutral-900", onClick: () => alert("Google OAuth — conectar no backend /auth/google"), children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", className: "h-5 w-5", children: [_jsx("path", { fill: "#FFC107", d: "M43.611 20.083H42V20H24v8h11.303C33.673 31.876 29.223 35 24 35c-7.18 0-13-5.82-13-13s5.82-13 13-13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1 11.85 1 2 10.85 2 23s9.85 22 22 22c12.15 0 22-9.85 22-22c0-1.477-.153-2.918-.389-4.317z" }), _jsx("path", { fill: "#FF3D00", d: "M6.306 14.691l6.571 4.819C14.48 16.2 18.87 13 24 13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1C15.317 1 7.853 5.777 4.116 12.691z" }), _jsx("path", { fill: "#4CAF50", d: "M24 45c5.164 0 9.86-1.977 13.409-5.197l-6.196-5.238C29.04 36.091 26.658 37 24 37c-5.192 0-9.594-3.293-11.188-7.895l-6.535 5.03C9.978 40.317 16.52 45 24 45z" }), _jsx("path", { fill: "#1976D2", d: "M43.611 20.083H42V20H24v8h11.303c-1.088 3.132-3.5 5.46-6.794 6.565l6.196 5.238C36.377 41.899 41 38 41 23c0-1.477-.153-2.918-.389-4.317z" })] }), "CADASTRAR COM O GOOGLE"] })] }))] }) })] }));
}
