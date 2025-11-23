import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  login as loginApi,
  register as registerApi,
  type AuthResponse, // ✅ novo: tipo da resposta normalizada
} from "../services/authService";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  remember: z.boolean().optional().default(false),
});
type LoginForm = z.infer<typeof loginSchema>;

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.enum(["freelancer", "demandante"]),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, { message: "Aceite os termos para continuar" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senhas não coincidem",
  });
type RegisterForm = z.infer<typeof registerSchema>;

export function AuthModal({
  open,
  onClose,
  initialTab = "login",
}: {
  open: boolean;
  onClose: () => void;
  initialTab?: "login" | "register";
}) {
  const [tab, setTab] = useState<"login" | "register">(initialTab);

  // estados para ver/ocultar as senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // router
  const navigate = useNavigate();

  // sempre que abrir, garante a aba pedida
  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  // store de auth
  const setAuth = useAuthStore((s) => s.setAuth);
  const setRemember = useAuthStore((s) => s.setRemember);

  // LOGIN
  const {
    register: rz,
    handleSubmit,
    formState: { errors: eLogin, isSubmitting: loadingLogin },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  // REGISTER
  const {
    register: rf,
    handleSubmit: handleRegister,
    formState: { errors: eReg, isSubmitting: loadingReg },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "freelancer" },
  });

  useEffect(() => {
    const esc = (ev: KeyboardEvent) => ev.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  // ✅ Centraliza o pós-sucesso de login/cadastro
  function handleAuthSuccess(auth: AuthResponse, remember?: boolean) {
    setAuth(auth.token, auth.user);

    if (typeof remember === "boolean") {
      setRemember(remember);
    }

    onClose();
    navigate("/app");
  }

  async function onSubmitLogin(data: LoginForm) {
    try {
      const res = await loginApi({
        email: data.email,
        password: data.password,
        remember: data.remember,
      });

      // antes tinha setRemember + setAuth + onClose + navigate
      // agora tudo fica centralizado aqui:
      handleAuthSuccess(res, !!data.remember);
    } catch (err) {
      console.error(err);
      alert("Não foi possível entrar. Verifique e-mail/senha.");
    }
  }

  async function onSubmitRegister(data: RegisterForm) {
    try {
      const res = await registerApi(data); // DTO já bate com o RegisterDTO

      // cadastro não usa "lembrar-me" -> começa sem persistir
      handleAuthSuccess(res, false);
    } catch (err) {
      console.error(err);
      alert("Não foi possível criar sua conta. Tente novamente.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-[92vw] max-w-md rounded-2xl p-[1px] shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,122,0,.8), rgba(91,84,255,.8))",
        }}
      >
        <div className="rounded-2xl bg-[rgba(20,18,51,0.8)] p-6 backdrop-blur-md">
          {/* Tabs / Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-6">
              <button
                onClick={() => setTab("login")}
                className={`pb-1 text-lg font-semibold ${
                  tab === "login" ? "text-white border-b-2" : "text-white/70"
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setTab("register")}
                className={`pb-1 text-lg font-semibold ${
                  tab === "register" ? "text-white border-b-2" : "text-white/70"
                }`}
              >
                Cadastrar
              </button>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              ✕
            </button>
          </div>

          {/* Content */}
          {tab === "login" ? (
            <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
              <div>
                <label className="text-sm text-white/80">Email</label>
                <input
                  {...rz("email")}
                  placeholder="Email"
                  className="mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2"
                />
                {eLogin.email && (
                  <p className="mt-1 text-xs text-red-300">
                    {eLogin.email.message}
                  </p>
                )}
              </div>

              {/* Campo de senha (login) com ícone circular de toggle */}
              <div className="relative">
                <label className="text-sm text-white/80">Senha</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...rz("password")}
                  placeholder="Senha"
                  className="mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 bottom-3 h-5 w-5 rounded-full grid place-items-center text-white/80 hover:text-white"
                  tabIndex={0}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="10" r="6" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="10" r="6" strokeWidth="2" />
                    </svg>
                  )}
                </button>
                {eLogin.password && (
                  <p className="mt-1 text-xs text-red-300">
                    {eLogin.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-white/80">
                  <input
                    type="checkbox"
                    {...rz("remember")}
                    className="accent-white"
                  />
                  Lembrar-me
                </label>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white/90"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              <button
                disabled={loadingLogin}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white disabled:opacity-60"
              >
                {loadingLogin ? "Entrando…" : "Entrar"}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/15" />
                <span className="text-white/60 text-sm">ou</span>
                <div className="h-px flex-1 bg-white/15" />
              </div>

              {/* Google button (com logo) */}
              <button
                type="button"
                className="w-full rounded-xl bg-white py-3 font-semibold text-neutral-900 flex items-center justify-center gap-3"
                onClick={() =>
                  alert("Google OAuth — conectar no backend /auth/google")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.673 31.876 29.223 35 24 35c-7.18 0-13-5.82-13-13s5.82-13 13-13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1 11.85 1 2 10.85 2 23s9.85 22 22 22c12.15 0 22-9.85 22-22 0-1.477-.153-2.918-.389-4.317z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.48 16.2 18.87 13 24 13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1 15.317 1 7.853 5.777 4.116 12.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 45c5.164 0 9.86-1.977 13.409-5.197l-6.196-5.238C29.04 36.091 26.658 37 24 37c-5.192 0-9.594-3.293-11.188-7.895l-6.535 5.03C9.978 40.317 16.52 45 24 45z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.088 3.132-3.5 5.46-6.794 6.565l6.196 5.238C36.377 41.899 41 38 41 23c0-1.477-.153-2.918-.389-4.317z"
                  />
                </svg>
                ENTRAR COM O GOOGLE
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleRegister(onSubmitRegister)}
              className="space-y-4"
            >
              <div>
                <label className="text-sm text-white/80">E-mail</label>
                <input
                  {...rf("email")}
                  placeholder="seu@email.com"
                  className="mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2"
                />
                {eReg.email && (
                  <p className="mt-1 text-xs text-red-300">
                    {eReg.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Campo senha do cadastro */}
                <div className="relative">
                  <label className="text-sm text-white/80">Senha</label>
                  <input
                    type={showRegPassword ? "text" : "password"}
                    {...rf("password")}
                    className="mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2"
                  />
                  <button
                    type="button"
                    aria-label={
                      showRegPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowRegPassword((v) => !v)}
                    className="absolute right-3 bottom-3 h-5 w-5 rounded-full grid place-items-center text-white/80 hover:text-white"
                    tabIndex={0}
                  >
                    {showRegPassword ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="6" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="6" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Campo confirmar senha do cadastro */}
                <div className="relative">
                  <label className="text-sm text-white/80">
                    Confirmar senha
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...rf("confirmPassword")}
                    className="mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2"
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 bottom-3 h-5 w-5 rounded-full grid place-items-center text-white/80 hover:text-white"
                    tabIndex={0}
                  >
                    {showConfirmPassword ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="6" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="6" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {(eReg.password || eReg.confirmPassword) && (
                <p className="text-xs text-red-300">
                  {eReg.password?.message || eReg.confirmPassword?.message}
                </p>
              )}

              <div className="flex gap-3">
                <label className="flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white/90 ring-1 ring-white/10">
                  <input
                    type="radio"
                    value="freelancer"
                    {...rf("role")}
                    className="accent-white"
                  />{" "}
                  Freelancer
                </label>
                <label className="flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white/90 ring-1 ring-white/10">
                  <input
                    type="radio"
                    value="demandante"
                    {...rf("role")}
                    className="accent-white"
                  />{" "}
                  Demandante
                </label>
              </div>

              <label className="flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  {...rf("acceptTerms")}
                  className="accent-white"
                />{" "}
                Eu aceito os Termos de uso
              </label>
              {eReg.acceptTerms && (
                <p className="text-xs text-red-300">
                  {eReg.acceptTerms.message as string}
                </p>
              )}

              <button
                disabled={loadingReg}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white disabled:opacity-60"
              >
                {loadingReg ? "Criando…" : "Criar conta"}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/15" />
                <span className="text-white/60 text-sm">ou</span>
                <div className="h-px flex-1 bg-white/15" />
              </div>

              {/* Google button (com logo) */}
              <button
                type="button"
                className="w-full rounded-xl bg-white py-3 font-semibold text-neutral-900 flex items-center justify-center gap-3"
                onClick={() =>
                  alert("Google OAuth — conectar no backend /auth/google")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.673 31.876 29.223 35 24 35c-7.18 0-13-5.82-13-13s5.82-13 13-13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1 11.85 1 2 10.85 2 23s9.85 22 22 22c12.15 0 22-9.85 22-22 0-1.477-.153-2.918-.389-4.317z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.48 16.2 18.87 13 24 13c3.313 0 6.319 1.235 8.598 3.252l5.657-5.657C34.95 3.053 29.748 1 24 1 15.317 1 7.853 5.777 4.116 12.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 45c5.164 0 9.86-1.977 13.409-5.197l-6.196-5.238C29.04 36.091 26.658 37 24 37c-5.192 0-9.594-3.293-11.188-7.895l-6.535 5.03C9.978 40.317 16.52 45 24 45z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.088 3.132-3.5 5.46-6.794 6.565l6.196 5.238C36.377 41.899 41 38 41 23c0-1.477-.153-2.918-.389-4.317z"
                  />
                </svg>
                CADASTRAR COM O GOOGLE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
